import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useFilesystemContent } from "../env";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (useFilesystemContent() || !sanityClient) return null;
  return sanityClient.fetch<T>(query, params);
}
