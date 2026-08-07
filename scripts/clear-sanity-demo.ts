/**
 * Delete Sanity demo seed documents (ids prefixed demo.*) and their demo-* image assets.
 *
 * Usage: npx tsx scripts/clear-sanity-demo.ts
 * Requires SANITY_API_WRITE_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function main() {
  const docs = await client.fetch<{ _id: string; _type: string; title?: string }[]>(
    `*[(_id match "demo.*" || _id match "drafts.demo.*")]{ _id, _type, title }`
  );
  const assets = await client.fetch<{ _id: string; originalFilename?: string }[]>(
    `*[_type == "sanity.imageAsset" && originalFilename match "demo-*"]{ _id, originalFilename }`
  );

  console.log(`Dataset: ${projectId}/${dataset}`);
  console.log(`Found ${docs.length} demo document(s), ${assets.length} demo image asset(s).`);

  if (docs.length === 0 && assets.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  for (const doc of docs) {
    console.log(`  doc  ${doc._type.padEnd(20)} ${doc._id}${doc.title ? ` — ${doc.title}` : ""}`);
  }
  for (const asset of assets) {
    console.log(`  asset ${asset._id} (${asset.originalFilename ?? "unnamed"})`);
  }

  const tx = client.transaction();
  for (const doc of docs) tx.delete(doc._id);
  for (const asset of assets) tx.delete(asset._id);
  await tx.commit();

  console.log(
    `Deleted ${docs.length} document(s) and ${assets.length} asset(s). Dataset is clear of demo.* seed content.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
