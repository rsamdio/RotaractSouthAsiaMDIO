/**
 * lib/indexnow.ts — Lightweight client for submitting URLs to IndexNow
 * (Bing, Yandex, Seznam, Naver).
 */

export const INDEXNOW_HOST = "rsamdio.org";
export const INDEXNOW_SITE_BASE = `https://${INDEXNOW_HOST}`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_KEY = "33caed80d6750051fe7e123e4ed79c85";
export const INDEXNOW_KEY_LOCATION = `${INDEXNOW_SITE_BASE}/33caed80d6750051fe7e123e4ed79c85.txt`;

export type IndexNowResult = {
  ok: boolean;
  status: number;
  message: string;
};

/**
 * Submit one or more URLs to the IndexNow protocol.
 * Includes a 3-second timeout guard so callers are never blocked.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (!urls || urls.length === 0) {
    return { ok: true, status: 200, message: "No URLs to submit." };
  }

  // Ensure all URLs are absolute
  const normalizedUrls = [
    ...new Set(
      urls.map((u) => {
        if (u.startsWith("http://") || u.startsWith("https://")) return u;
        return `${INDEXNOW_SITE_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
      })
    ),
  ];

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "RSAMDIO-IndexNow-Bot/1.0",
      },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: normalizedUrls,
      }),
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      return {
        ok: true,
        status: res.status,
        message: `Successfully submitted ${normalizedUrls.length} URL(s) to IndexNow.`,
      };
    }

    const text = await res.text().catch(() => "");
    return {
      ok: false,
      status: res.status,
      message: `IndexNow responded with HTTP ${res.status}: ${text}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      status: 0,
      message: `IndexNow submission error: ${message}`,
    };
  }
}
