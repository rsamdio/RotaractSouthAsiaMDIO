import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { submitToIndexNow } from "@/lib/indexnow";

export const runtime = "nodejs";

type SanityWebhookPayload = {
  _type?: string;
  slug?: string | { current?: string } | null;
  previousSlug?: string | { current?: string } | null;
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

function getPathsToRevalidate(payload: SanityWebhookPayload): {
  paths: string[];
  indexNowUrls: string[];
} {
  const _type = payload._type;
  const slug = extractSlug(payload.slug);
  const previousSlug = extractSlug(payload.previousSlug);

  const paths = new Set<string>();
  const indexNowUrls = new Set<string>();

  const addPath = (path: string, notifySearch = false) => {
    paths.add(path);
    if (notifySearch) indexNowUrls.add(path);
  };

  switch (_type) {
    case "story":
      if (slug) addPath(`/news/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/news/${previousSlug}`);
      addPath("/news", true);
      addPath("/stories", true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;

    case "announcement":
      if (slug) addPath(`/news/${slug}`, true);
      if (previousSlug && previousSlug !== slug) addPath(`/news/${previousSlug}`);
      addPath("/news", true);
      addPath("/announcements", true);
      addPath("/", true);
      addPath("/sitemap.xml");
      break;

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
      addPath("/");
      addPath("/news");
      addPath("/stories");
      addPath("/announcements");
      addPath("/events");
      addPath("/initiatives");
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

    if (!body || !body._type) {
      console.warn("[Revalidate] Received empty or malformed webhook payload.");
      return NextResponse.json({ message: "Bad request: missing body or _type" }, { status: 400 });
    }

    const { paths, indexNowUrls } = getPathsToRevalidate(body);

    if (paths.length === 0) {
      return NextResponse.json({
        revalidated: false,
        message: `No mapped paths for document type: ${body._type}`,
      });
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
      type: body._type,
      now: Date.now(),
      paths,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Revalidate] Unexpected error:", message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
