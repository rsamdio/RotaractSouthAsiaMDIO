#!/usr/bin/env node
/**
 * submit-indexnow.mjs — Automated URL submission to IndexNow (Bing, Yandex, etc.)
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs               # Submits all canonical sitemap URLs
 *   node scripts/submit-indexnow.mjs --dry-run     # Inspect URLs without sending
 *   node scripts/submit-indexnow.mjs --build       # CI mode (only runs on production deploys)
 *   node scripts/submit-indexnow.mjs --force       # Bypass remote key check
 *   node scripts/submit-indexnow.mjs --url=<url>   # Submit a single URL
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");

const HOST = "rsamdio.org";
const SITE_BASE = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_URL = `${SITE_BASE}/sitemap.xml`;
const BATCH_SIZE = 10000;

function getIndexNowKey() {
  const publicDir = resolve(ROOT_DIR, "public");
  // Look for dedicated key file in public/
  try {
    const files = ["33caed80d6750051fe7e123e4ed79c85.txt"];
    for (const file of files) {
      const fullPath = resolve(publicDir, file);
      if (existsSync(fullPath)) {
        const content = readFileSync(fullPath, "utf-8").trim();
        if (content) return { key: content, filename: file };
      }
    }
  } catch (err) {
    console.error("[IndexNow] Error reading public key file:", err.message);
  }
  return { key: "33caed80d6750051fe7e123e4ed79c85", filename: "33caed80d6750051fe7e123e4ed79c85.txt" };
}

const { key: KEY, filename: KEY_FILENAME } = getIndexNowKey();
const KEY_LOCATION = `${SITE_BASE}/${KEY_FILENAME}`;

// Parse CLI flags
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isBuildMode = args.includes("--build");
const isForce = args.includes("--force");
const targetUrlArg = args.find((a) => a.startsWith("--url="))?.replace("--url=", "");

async function checkRemoteKey() {
  try {
    const res = await fetch(KEY_LOCATION, { method: "GET" });
    if (!res.ok) return false;
    const body = await res.text();
    return body.trim() === KEY;
  } catch {
    return false;
  }
}

async function discoverUrls() {
  if (targetUrlArg) {
    const url = targetUrlArg.startsWith("http") ? targetUrlArg : `${SITE_BASE}${targetUrlArg.startsWith("/") ? "" : "/"}${targetUrlArg}`;
    return [url];
  }

  // 1. Try to fetch the live sitemap
  try {
    const res = await fetch(SITEMAP_URL, {
      headers: { "User-Agent": "RSAMDIO-IndexNow-Bot/1.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>\s*(https?:\/\/[^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
      if (matches.length > 0) {
        return [...new Set(matches)];
      }
    }
  } catch {
    // Fall back to offline discovery if network fetch fails
  }

  // 2. Fallback: discover URLs from project filesystem
  const routes = [
    "",
    "/about",
    "/leadership",
    "/presidents",
    "/districts",
    "/initiatives",
    "/news",
    "/stories",
    "/announcements",
    "/chronicles",
    "/events",
    "/contact",
    "/privacy",
    "/terms",
  ];

  // Member district routes
  try {
    const districtsPath = resolve(ROOT_DIR, "config", "memberDistricts.json");
    if (existsSync(districtsPath)) {
      const districts = JSON.parse(readFileSync(districtsPath, "utf-8"));
      for (const d of districts) {
        if (d.number) routes.push(`/districts/${d.number}`);
      }
    }
  } catch (err) {
    console.warn("[IndexNow] Could not read memberDistricts.json:", err.message);
  }

  return [...new Set(routes.map((r) => `${SITE_BASE}${r}`))];
}

async function submitBatch(urls, batchNum, totalBatches) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  if (isDryRun) {
    console.log(`\n[IndexNow] [DRY RUN] Batch ${batchNum}/${totalBatches} (${urls.length} URLs):`);
    console.log(JSON.stringify(payload, null, 2));
    return true;
  }

  console.log(`[IndexNow] Submitting batch ${batchNum}/${totalBatches} (${urls.length} URLs) to ${INDEXNOW_ENDPOINT}...`);
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200) {
      console.log(`[IndexNow] ✓ Success: HTTP 200 — ${urls.length} URLs submitted successfully.`);
      return true;
    } else if (res.status === 202) {
      console.log(`[IndexNow] ✓ Accepted: HTTP 202 — ${urls.length} URLs received (key validation pending).`);
      return true;
    } else if (res.status === 400) {
      console.error(`[IndexNow] ✗ HTTP 400 Bad Request — check URL syntax or payload formatting.`);
      return false;
    } else if (res.status === 403) {
      console.error(`[IndexNow] ✗ HTTP 403 Forbidden — key verification failed. Make sure ${KEY_LOCATION} is live and returns "${KEY}".`);
      return false;
    } else if (res.status === 422) {
      console.error(`[IndexNow] ✗ HTTP 422 Unprocessable — URLs must belong to ${HOST}.`);
      return false;
    } else if (res.status === 429) {
      console.warn(`[IndexNow] ⚠ HTTP 429 Rate limited — submitted too frequently.`);
      return false;
    } else {
      const text = await res.text().catch(() => "");
      console.warn(`[IndexNow] Response HTTP ${res.status}: ${text}`);
      return res.ok;
    }
  } catch (err) {
    console.error(`[IndexNow] Network error submitting to IndexNow:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`[IndexNow] Target Host: ${HOST}`);
  console.log(`[IndexNow] Key File:    ${KEY_LOCATION}`);

  // Build mode checks
  if (isBuildMode) {
    const isProduction = process.env.CONTEXT === "production" || process.env.INDEXNOW_SUBMIT === "1";
    if (!isProduction) {
      console.log(`[IndexNow] Build mode: skipping submission (CONTEXT=${process.env.CONTEXT || "local"}). Set INDEXNOW_SUBMIT=1 to force.`);
      process.exit(0);
    }
  }

  // Ownership verification key check
  if (!isDryRun && !isForce) {
    const keyIsLive = await checkRemoteKey();
    if (!keyIsLive) {
      if (isBuildMode) {
        console.log(`[IndexNow] Notice: Key file not yet verified live at ${KEY_LOCATION}.`);
        console.log(`[IndexNow] Skipping build-time submission until after the deploy goes live.`);
        console.log(`[IndexNow] Run 'npm run indexnow' once the deploy is published.`);
        process.exit(0);
      } else {
        console.warn(`[IndexNow] Warning: Could not verify key file at ${KEY_LOCATION}.`);
        console.warn(`[IndexNow] If you recently added the file, deploy it first or use --force to bypass this check.`);
      }
    }
  }

  // Discover URLs
  const urls = await discoverUrls();
  if (!urls || urls.length === 0) {
    console.error("[IndexNow] No URLs found to submit.");
    process.exit(1);
  }

  console.log(`[IndexNow] Discovered ${urls.length} URL(s) to submit.`);

  // Chunk into batches of up to 10,000 URLs
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  let allSuccess = true;
  for (let i = 0; i < batches.length; i++) {
    const ok = await submitBatch(batches[i], i + 1, batches.length);
    if (!ok) allSuccess = false;
  }

  if (isDryRun) {
    console.log(`\n[IndexNow] Dry run complete. ${urls.length} URLs ready for submission.`);
  } else if (allSuccess) {
    console.log(`[IndexNow] Submission complete.`);
  } else if (isBuildMode) {
    console.log(`[IndexNow] Build finished with submission warnings (non-fatal).`);
  }
}

main().catch((err) => {
  console.error("[IndexNow] Unexpected error:", err);
  if (!isBuildMode) process.exit(1);
});
