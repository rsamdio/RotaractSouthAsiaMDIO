export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/**
 * Server-only write/read token (Editor or higher).
 * Put in `.env.local` only — never commit, never set on Netlify.
 */
export const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || "";

/** Use static config seeds when Sanity is not configured (local / pre-project). */
export function useFilesystemContent() {
  if (process.env.USE_FS_CONTENT === "1") return true;
  return !projectId;
}

export function assertSanityConfigured() {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Create a Sanity project and set env vars, or set USE_FS_CONTENT=1 for local static seeds."
    );
  }
}

export function assertSanityWriteToken() {
  assertSanityConfigured();
  if (!writeToken) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN. Create a token in Sanity Manage → API → Tokens and add it to .env.local."
    );
  }
}
