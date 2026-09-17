import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  projectId,
  shouldUseFilesystemContent,
  writeToken,
} from "../env";

/**
 * Published content client.
 * In Next.js App Router with on-demand ISR, server components fetch directly
 * from Sanity (`useCdn: false`) so updates are immediate without Fastly CDN TTL lag.
 * Netlify Edge Cache already caches the generated HTML output globally for visitors.
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

/**
 * Authenticated client for local scripts / server mutations.
 * Uses SANITY_API_WRITE_TOKEN from `.env.local` — never expose to the browser.
 */
export const sanityWriteClient =
  projectId && writeToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: writeToken,
        perspective: "published",
      })
    : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (shouldUseFilesystemContent() || !sanityClient) return null;
  // Prefer write client locally when present — fresher reads, no CDN lag while authoring.
  const client =
    typeof window === "undefined" && sanityWriteClient ? sanityWriteClient : sanityClient;
  return client.fetch<T>(query, params);
}
