import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !builder) return undefined;
  return builder.image(source);
}
