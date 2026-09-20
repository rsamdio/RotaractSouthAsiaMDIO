import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { submitToIndexNow } from "@/lib/indexnow";
import { sanityFetch } from "@/sanity/lib/client";

export const runtime = "nodejs";

type SanityWebhookPayload = {
  operation?: string;
  _type?: string;
  slug?: string | { current?: string } | null;
  previousSlug?: string | { current?: string } | null;
  before?: {
    _type?: string;
    slug?: string | { current?: string } | null;
  } | null;
};

function extractSlug(val: unknown): string | undefined {
  if (typeof val === "string" && val.trim()) return val.trim();
  if (
    val &&
    typeof val === "object" &&
    "current" in val &&
    typeof (val as { current?: unknown }).current === "string"
  ) {
    return (val as { current: string }).current.trim();
  }
  return undefined;
}

/**
 * For sequential editorial streams with adjacent ("previous / next") navigation,
 * modifying or publishing post B impacts neighboring posts whose prev/next cards
 * pointed to or should now point to post B.
 *
 * This queries Sanity to discover affected neighbor slugs so their static pages
 * are revalidated alongside the edited post. Guarded with a 3.5s timeout so it
 * never hangs Netlify execution.
 */
async function getRelatedSlugsForPost(
  type: "story" | "announcement",
  currentSlug?: string,
  previousSlug?: string
): Promise<string[]> {
  if (!currentSlug && !previousSlug) return [];
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Sanity query timeout")), 3500)
    );
    const fetchPromise = sanityFetch<{ slug: string }[]>(
      `*[_type == $type && defined(slug.current)] | order(date desc) { "slug": slug.current }`,
      { type }
    );
    const posts = await Promise.race([fetchPromise, timeoutPromise]);
    if (!posts || posts.length === 0) return [];

    const slugsToInvalidate = new Set<string>();

    // For collections with <= 50 posts, invalidate all items so the
    // "X of Y Stories" index counter and adjacent navigation stay 100% coherent.
    // In Next.js App Router, revalidatePath is an instantaneous memory-tag expiration.
    if (posts.length <= 50) {
      for (const p of posts) {
        if (p.slug) slugsToInvalidate.add(p.slug);
      }
      return Array.from(slugsToInvalidate);
    }

    // For larger collections, invalidate immediate neighbors and top 3 newest.
    const checkSlugs = [currentSlug, previousSlug].filter(Boolean) as string[];
    for (const s of checkSlugs) {
      const idx = posts.findIndex((p) => p.slug === s);
      if (idx !== -1) {
        slugsToInvalidate.add(posts[idx].slug);
        if (idx > 0) slugsToInvalidate.add(posts[idx - 1].slug);
        if (idx < posts.length - 1) slugsToInvalidate.add(posts[idx + 1].slug);
      }
    }
    for (let i = 0; i < Math.min(3, posts.length); i++) {
      if (posts[i]?.slug) slugsToInvalidate.add(posts[i].slug);
    }

    return Array.from(slugsToInvalidate);
  } catch (err) {
    console.warn("[Revalidate] Notice: Could not fetch adjacent slugs from Sanity (skipping):", err);
    return [];
  }
}

async function getPathsToRevalidate(payload: SanityWebhookPayload): Promise<{
  paths: string[];
  indexNowUrls: string[];
  revalidateAllLayout: boolean;
}> {
  // Gracefully handle both custom GROQ projections and default Sanity webhook deletion payloads
  const _type = payload._type || payload.before?._type;
  const currentSlug = extractSlug(payload.slug);
  const previousSlug =
    extractSlug(payload.previousSlug) || extractSlug(payload.before?.slug);
  const slug = currentSlug || previousSlug;

  const paths = new Set<string>();
  const indexNowUrls = new Set<string>();
  let revalidateAllLayout = false;

  const addPath = (path: string, notifySearch = false) => {
    paths.add(path);
    if (notifySearch) indexNowUrls.add(path);
  };

  switch (_type) {
    case "story": {
      if (slug) addPath(`/news/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/news/${previousSlug}`);
      addPath("/news", true);
      addPath("/stories", true);
      addPath("/", true);
      addPath("/sitemap.xml");

      const related = await getRelatedSlugsForPost("story", slug, previousSlug);
      for (const relSlug of related) {
        if (relSlug !== slug) {
          addPath(`/news/${relSlug}`, false);
        }
      }
      break;
    }

    case "announcement": {
      if (slug) addPath(`/news/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/news/${previousSlug}`);
      addPath("/news", true);
      addPath("/announcements", true);
      addPath("/", true);
      addPath("/sitemap.xml");

      const related = await getRelatedSlugsForPost("announcement", slug, previousSlug);
      for (const relSlug of related) {
        if (relSlug !== slug) {
          addPath(`/news/${relSlug}`, false);
        }
      }
      break;
    }

    case "chronicleEdition":
      addPath("/chronicles", true);
      addPath("/news", true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;

    case "event":
      if (slug) addPath(`/events/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/events/${previousSlug}`);
      addPath("/events", true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;

    case "programInitiative":
      if (slug) addPath(`/initiatives/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/initiatives/${previousSlug}`);
      addPath("/initiatives", true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;

    case "category":
    case "tag":
    case "eventKind":
    case "initiativeIcon":
    case "brandColor":
      // A taxonomy or design token change affects both listing hubs and all detail pages
      // (e.g. category name on an article, badge color on an event, icon on an initiative).
      // Revalidating '/' as layout invalidates the entire route cache tree instantly.
      revalidateAllLayout = true;
      addPath("/");
      addPath("/news");
      addPath("/stories");
      addPath("/announcements");
      addPath("/events");
      addPath("/initiatives");
      addPath("/sitemap.xml");
      break;

    default:
      // Fallback for any future document types: revalidate the slug and home
      if (slug) addPath(`/${slug}`, true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;
  }

  return {
    paths: Array.from(paths),
    indexNowUrls: Array.from(indexNowUrls),
    revalidateAllLayout,
  };
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[Revalidate] Error: SANITY_REVALIDATE_SECRET is not configured.");
    return NextResponse.json(
      { message: "Server misconfiguration: SANITY_REVALIDATE_SECRET missing" },
      { status: 500 }
    );
  }

  try {
    // parseBody from next-sanity/webhook verifies the HMAC-SHA256 signature in sanity-webhook-signature.
    // Set waitForContentLakeEventualConsistency to false so the endpoint returns immediately.
    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      req,
      secret,
      false
    );

    if (!isValidSignature) {
      console.warn("[Revalidate] Rejected webhook: Invalid signature.");
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const _type = body?._type || body?.before?._type;

    if (!body || !_type) {
      console.warn("[Revalidate] Received empty or malformed webhook payload.");
      return NextResponse.json({ message: "Bad request: missing body or _type" }, { status: 400 });
    }

    const { paths, indexNowUrls, revalidateAllLayout } = await getPathsToRevalidate(body);

    if (paths.length === 0 && !revalidateAllLayout) {
      return NextResponse.json({
        revalidated: false,
        message: `No mapped paths for document type: ${_type}`,
      });
    }

    if (revalidateAllLayout) {
      try {
        revalidatePath("/", "layout");
      } catch (err) {
        console.error("[Revalidate] Error revalidating root layout:", err);
      }
    }

    // Revalidate all affected routes in Next.js
    for (const path of paths) {
      try {
        revalidatePath(path);
      } catch (err) {
        console.error(`[Revalidate] Error revalidating ${path}:`, err);
      }
    }

    // In production or when forced, dispatch targeted IndexNow ping (non-blocking)
    const shouldSubmitIndexNow =
      process.env.CONTEXT === "production" ||
      process.env.NODE_ENV === "production" ||
      process.env.INDEXNOW_SUBMIT === "1";

    if (shouldSubmitIndexNow && indexNowUrls.length > 0) {
      submitToIndexNow(indexNowUrls)
        .then((res) => {
          if (!res.ok) console.warn("[Revalidate] IndexNow notice:", res.message);
        })
        .catch((err) => {
          console.error("[Revalidate] IndexNow error:", err);
        });
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      operation: body.operation || "update",
      now: Date.now(),
      paths,
      revalidateAllLayout,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Revalidate] Unexpected error:", message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
