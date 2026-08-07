import { createClient, type SanityClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  projectId,
  useFilesystemContent,
  writeToken,
} from "../env";

/** Public published reads (CDN). Safe in browser when project id is public. */
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/**
 * Authenticated client for local scripts / server mutations.
 * Uses SANITY_API_WRITE_TOKEN from `.env.local` — never expose to the browser.
 */
export const sanityWriteClient: SanityClient | null =
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
  if (useFilesystemContent() || !sanityClient) return null;
  // Prefer write client locally when present — fresher reads, no CDN lag while authoring.
  const client =
    typeof window === "undefined" && sanityWriteClient ? sanityWriteClient : sanityClient;
  return client.fetch<T>(query, params);
}
