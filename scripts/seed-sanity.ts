import { createClient } from "next-sanity";
import { standardColors, standardCategories, standardTags, stories, announcements, rsaChronicles } from "../config/news";
import { siteEvents } from "../config/events";
import { programInitiatives } from "../config/initiatives";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log(`Starting seed to Sanity (${projectId}/${dataset})...`);

  // 1. Seed Brand Colors
  console.log("\n--- Seeding Colors & Accents ---");
  const colorMap: Record<string, string> = {}; // hex -> docId
  for (const [index, c] of standardColors.entries()) {
    const docId = `brandColor-${c.hex.replace("#", "").toLowerCase()}`;
    const doc = {
      _id: docId,
      _type: "brandColor",
      name: c.name,
      hex: c.hex,
      description: c.description,
    };
    await client.createOrReplace(doc);
    colorMap[c.hex.toLowerCase()] = docId;
    console.log(`✓ Color: ${c.name} (${c.hex}) -> ${docId}`);
  }

  // 2. Seed Categories
  console.log("\n--- Seeding Categories ---");
  const categoryMap: Record<string, string> = {}; // title -> docId
  for (const cat of standardCategories) {
    const docId = `category-${cat.slug}`;
    const colorHex = cat.color?.toLowerCase();
    const colorDocId = colorHex ? colorMap[colorHex] : undefined;

    const doc: any = {
      _id: docId,
      _type: "category",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
    };

    if (colorDocId) {
      doc.colorRef = { _type: "reference", _ref: colorDocId };
    }

    await client.createOrReplace(doc);
    categoryMap[cat.title] = docId;
    console.log(`✓ Category: ${cat.title} -> ${docId}`);
  }

  // 3. Seed Tags
  console.log("\n--- Seeding Tags ---");
  const tagMap: Record<string, string> = {}; // title -> docId
  for (const t of standardTags) {
    const docId = `tag-${t.slug}`;
    const doc = {
      _id: docId,
      _type: "tag",
      title: t.title,
      slug: { _type: "slug", current: t.slug },
    };
    await client.createOrReplace(doc);
    tagMap[t.title] = docId;
    console.log(`✓ Tag: ${t.title} -> ${docId}`);
  }

  // 4. Seed Stories (if not already seeded)
  console.log("\n--- Seeding Stories ---");
  for (const s of stories) {
    const docId = `story-${s.slug}`;
    const catId = categoryMap[s.category] || categoryMap["Community Service"];
    const colorHex = s.customColor?.toLowerCase();
    const colorDocId = colorHex ? colorMap[colorHex] : undefined;

    const doc: any = {
      _id: docId,
      _type: "story",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      date: s.date,
      categoryRef: catId ? { _type: "reference", _ref: catId } : undefined,
      excerpt: s.excerpt,
      body: s.body,
      featured: s.featured ?? false,
    };

    if (s.tags && s.tags.length > 0) {
      doc.tags = s.tags
        .map((tagName) => {
          const tId = tagMap[tagName];
          return tId ? { _type: "reference", _ref: tId, _key: tId } : null;
        })
        .filter(Boolean);
    }

    if (colorDocId) {
      doc.colorRef = { _type: "reference", _ref: colorDocId };
    }

    await client.createOrReplace(doc);
    console.log(`✓ Story: ${s.title}`);
  }

  // 5. Seed Announcements
  console.log("\n--- Seeding Announcements ---");
  for (const a of announcements) {
    const docId = `announcement-${a.slug}`;
    const catId = categoryMap[a.category] || categoryMap["Leadership & Training"] || categoryMap["Professional Development"];
    const colorHex = a.customColor?.toLowerCase();
    const colorDocId = colorHex ? colorMap[colorHex] : undefined;

    const doc: any = {
      _id: docId,
      _type: "announcement",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      date: a.date,
      categoryRef: catId ? { _type: "reference", _ref: catId } : undefined,
      excerpt: a.excerpt,
      body: a.body,
      featured: a.featured ?? false,
    };

    if (a.tags && a.tags.length > 0) {
      doc.tags = a.tags
        .map((tagName) => {
          const tId = tagMap[tagName];
          return tId ? { _type: "reference", _ref: tId, _key: tId } : null;
        })
        .filter(Boolean);
    }

    if (colorDocId) {
      doc.colorRef = { _type: "reference", _ref: colorDocId };
    }

    await client.createOrReplace(doc);
    console.log(`✓ Announcement: ${a.title}`);
  }

  // 6. Seed Chronicles
  console.log("\n--- Seeding RSA Chronicles ---");
  for (const c of rsaChronicles) {
    const docId = `chronicle-${c.slug}`;
    const doc: any = {
      _id: docId,
      _type: "chronicleEdition",
      editionName: c.editionName,
      slug: { _type: "slug", current: c.slug },
      date: c.date,
      preview: c.preview,
      readerUrl: c.readerUrl,
    };
    await client.createOrReplace(doc);
    console.log(`✓ Chronicle: ${c.editionName}`);
  }

  // 7. Seed Initiatives
  console.log("\n--- Seeding Initiatives ---");
  for (const p of programInitiatives) {
    const docId = `programInitiative-${p.slug}`;
    const catId = categoryMap[p.category] || categoryMap["Community Service"];
    const colorHex = p.accent?.toLowerCase();
    const colorDocId = colorHex ? colorMap[colorHex] : undefined;

    const doc: any = {
      _id: docId,
      _type: "programInitiative",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      categoryRef: catId ? { _type: "reference", _ref: catId } : undefined,
      status: p.status,
      summary: p.summary,
      livingNote: p.livingNote,
      icon: p.icon,
      body: p.body,
      featured: p.featured ?? false,
      ctaLabel: p.ctaLabel ?? "Learn more",
      ctaUrl: p.ctaUrl,
    };

    if (colorDocId) {
      doc.colorRef = { _type: "reference", _ref: colorDocId };
    }

    await client.createOrReplace(doc);
    console.log(`✓ Initiative: ${p.title}`);
  }

  // 8. Seed Events
  console.log("\n--- Seeding Events ---");
  for (const e of siteEvents) {
    const docId = `event-${e.slug}`;
    const doc: any = {
      _id: docId,
      _type: "event",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      tagline: e.tagline,
      description: e.description,
      body: e.body,
      startDate: e.startDate,
      endDate: e.endDate,
      startTime: e.startTime,
      endTime: e.endTime,
      timezoneLabel: e.timezoneLabel || "IST",
      location: e.location,
      venue: e.venue,
      kind: e.kind,
      signature: e.signature ?? false,
      registrationUrl: e.registrationUrl,
      registrationLabel: e.registrationLabel,
    };

    const colorHex = e.customAccent?.toLowerCase();
    const colorDocId = colorHex ? colorMap[colorHex] : undefined;
    if (colorDocId) {
      doc.colorRef = { _type: "reference", _ref: colorDocId };
    }

    await client.createOrReplace(doc);
    console.log(`✓ Event: ${e.title}`);
  }

  console.log("\n✅ All Sanity data seeded successfully!");
}

seed().catch((err) => {
  console.error("Error seeding Sanity:", err);
  process.exit(1);
});
