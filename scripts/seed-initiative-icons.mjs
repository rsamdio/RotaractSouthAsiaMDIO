#!/usr/bin/env node

/**
 * Dedicated, zero-risk seeder for Initiative Icons in Sanity CMS.
 *
 * CRITICAL SAFETY GUARANTEE:
 * - ONLY creates or updates the 15 managed 'initiativeIcon' taxonomy documents.
 * - NEVER creates dummy stories, events, announcements, chronicles, or initiatives.
 * - Safely patches existing initiatives (like drafts) to connect their iconRef.
 */

import fs from "node:fs";
import path from "node:path";

// 1. Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
let projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
let token = process.env.SANITY_API_WRITE_TOKEN;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    const val = rest.join("=").trim().replace(/^["']|["']$/g, "");
    if (key === "NEXT_PUBLIC_SANITY_PROJECT_ID" && !projectId) projectId = val;
    if (key === "NEXT_PUBLIC_SANITY_DATASET" && !dataset) dataset = val;
    if (key === "SANITY_API_WRITE_TOKEN" && !token) token = val;
  }
}

if (!projectId || !token) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const SANITY_API_URL = `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}`;
const SANITY_QUERY_URL = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}`;

const standardIcons = [
  {
    key: "compass",
    title: "Compass / Direction",
    description: "Orientation, leadership pathways, club officer guidance, and strategic roadmaps.",
  },
  {
    key: "service",
    title: "Service (Hands & Heart)",
    description: "Community service projects, disaster relief, health drives, and volunteer initiatives.",
  },
  {
    key: "sports",
    title: "Sports & Athletics (Trophy)",
    description: "Sports meets, cricket tournaments, marathons, and physical wellness events.",
  },
  {
    key: "leadership",
    title: "Leadership & Speaking (Mic)",
    description: "Leadership training assemblies, speech contests, and professional development seminars.",
  },
  {
    key: "fellowship",
    title: "Fellowship & Community (Users)",
    description: "Inter-district twinning, international exchanges, club socials, and youth networking.",
  },
  {
    key: "environment",
    title: "Environment & Green (Leaf)",
    description: "Tree planting, climate literacy, recycling drives, and environmental conservation.",
  },
  {
    key: "education",
    title: "Education & Literacy (Book)",
    description: "Literacy promotion, school adoptions, skill training, and library setup.",
  },
  {
    key: "health",
    title: "Health & Wellness (Activity)",
    description: "Blood donation, mental health awareness, medical checkups, and wellness campaigns.",
  },
  {
    key: "peace",
    title: "Peace & Harmony (Shield)",
    description: "Peace rallies, conflict resolution seminars, cultural unity, and ethics workshops.",
  },
  {
    key: "globe",
    title: "Global & Cross-Border (Globe)",
    description: "International service, RSA Connect collaboration, and cross-border partnerships.",
  },
  {
    key: "award",
    title: "Recognition & Awards (Award)",
    description: "ROAR Awards, district citations, hall of fame, and outstanding club accolades.",
  },
  {
    key: "lightbulb",
    title: "Innovation & Ideas (Lightbulb)",
    description: "Hackathons, technology adoption, digital platforms, and innovative solutions.",
  },
  {
    key: "sparkles",
    title: "Campaigns & Special Projects (Sparkles)",
    description: "High-impact regional campaigns, signature annual drives, and celebratory projects.",
  },
  {
    key: "calendar",
    title: "Calendar & Milestones (Calendar)",
    description: "Rotary theme months, charter anniversaries, and key regional dates.",
  },
  {
    key: "target",
    title: "Target & Goals (Target)",
    description: "Membership growth targets, strategic goals, and achievement benchmarks.",
  },
];

async function runMutations(mutations) {
  const response = await fetch(SANITY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Sanity mutation failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function runQuery(query) {
  const url = `${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${JSON.stringify(data)}`);
  }
  return data.result;
}

async function main() {
  console.log(`\n========================================`);
  console.log(`  RSAMDIO Managed Icons Seeder`);
  console.log(`  Project: ${projectId} | Dataset: ${dataset}`);
  console.log(`========================================\n`);

  // 1. Build icon createOrReplace mutations
  const iconMutations = standardIcons.map((icon) => ({
    createOrReplace: {
      _id: `initiativeIcon-${icon.key}`,
      _type: "initiativeIcon",
      title: icon.title,
      key: icon.key,
      description: icon.description,
    },
  }));

  console.log(`Creating/updating ${iconMutations.length} master icon documents...`);
  await runMutations(iconMutations);

  for (const icon of standardIcons) {
    console.log(`  ✓ Icon: ${icon.title} (ID: initiativeIcon-${icon.key})`);
  }

  // 2. Safely connect any existing initiative documents that have legacy string icon
  console.log(`\nChecking existing initiatives for icon reference linking...`);
  const initiatives = await runQuery(
    `*[_type == "programInitiative" && defined(icon) && !defined(iconRef)]{ _id, title, icon }`
  );

  if (initiatives && initiatives.length > 0) {
    console.log(`Found ${initiatives.length} initiative(s) with legacy icon string to link:`);
    const linkMutations = initiatives.map((init) => {
      const targetIconId = `initiativeIcon-${init.icon}`;
      console.log(`  → Linking "${init.title}" (${init._id}) to icon ${targetIconId}`);
      return {
        patch: {
          id: init._id,
          set: {
            iconRef: {
              _type: "reference",
              _ref: targetIconId,
            },
          },
        },
      };
    });

    await runMutations(linkMutations);
    console.log(`✓ Successfully linked ${linkMutations.length} initiative(s) to their managed icon!`);
  } else {
    console.log(`✓ All initiatives already have iconRef set or no legacy icons need linking.`);
  }

  console.log(`\n🎉 Done! Only Initiative Icons were seeded. Zero events or extra initiatives created.\n`);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
