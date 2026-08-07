/**
 * Seed Sanity with demo stories, announcements, chronicles, events, and programs.
 * Idempotent: re-running upserts the same document IDs.
 *
 * Usage: npx tsx scripts/seed-sanity-demo.ts
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

type SeedImage = { url: string; filename: string };

async function uploadImageFromUrl(img: SeedImage): Promise<string> {
  const res = await fetch(img.url);
  if (!res.ok) throw new Error(`Failed to fetch image ${img.url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, {
    filename: img.filename,
    contentType: res.headers.get("content-type") || "image/jpeg",
  });
  return asset._id;
}

function imageRef(assetId: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

const stories = [
  {
    _id: "demo.story.floods-3220",
    slug: "rebuilding-after-floods-district-3220",
    title: "Rebuilding After Floods in District 3220",
    category: "Service",
    excerpt:
      "A joint effort that provided temporary housing for over 500 displaced families across coastal Sri Lanka.",
    body: "Clubs across District 3220 mobilized within 48 hours of seasonal flooding, coordinating temporary housing, clean water access, and school-supply drives for over 500 displaced families.\n\nThe relief effort drew volunteers from 12 clubs and was supported by a Rotary Foundation disaster-response grant.",
    date: "2026-03-02",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-floods.jpg",
    },
  },
  {
    _id: "demo.story.summit-attendance",
    slug: "south-asia-summit-record-attendance",
    title: "South Asia Summit Concludes With Record Attendance",
    category: "Leadership",
    excerpt:
      "Over 1,200 delegates from 8 nations gathered for three days of leadership training and fellowship.",
    body: "This year's regional summit drew the largest delegate turnout in MDIO history, with representatives from every member nation attending workshops on governance, public image, and cross-border project design.",
    date: "2026-02-18",
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-summit.jpg",
    },
  },
  {
    _id: "demo.story.clean-water-nepal",
    slug: "clean-water-project-nepal",
    title: "Clean Water Access Reaches Three Himalayan Villages",
    category: "Service",
    excerpt:
      "District 3292 clubs installed sand-filtration systems benefiting over 450 schoolchildren.",
    body: "Rotaractors in District 3292 partnered with local health authorities to install heavy-duty sand filtration systems in three rural schools, providing safe drinking water to more than 450 children daily.",
    date: "2026-01-22",
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-water.jpg",
    },
  },
];

const announcements = [
  {
    _id: "demo.announcement.ananta-2026",
    slug: "ananta-2026-announcement",
    title: "RSAMDIO Announces ANANTA 2026 Installation Ceremony",
    category: "Announcement",
    excerpt:
      "The 17th RSAMDIO Installation Ceremony and ROAR Awards will be hosted in Bengaluru, India, marking the start of RY 2026–27.",
    body: "Rotaract South Asia MDIO is pleased to announce ANANTA 2026, the 17th RSAMDIO Installation Ceremony and ROAR Awards, to be hosted in Bengaluru, India.\n\nThe gathering will mark the formal start of Rotary Year 2026–27 and bring together District Rotaract Representatives, Executive Board members, and Rotaractors from across the region.",
    date: "2026-01-10",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-ananta-announce.jpg",
    },
  },
  {
    _id: "demo.announcement.drr-appointments",
    slug: "new-drr-appointments",
    title: "DRR Appointments Confirmed for RY 2026–27",
    category: "Announcement",
    excerpt:
      "District Rotaract Representatives have been confirmed across the region's member nations for the incoming Rotary Year.",
    body: "RSAMDIO has confirmed District Rotaract Representative appointments for Rotary Year 2026–27 across member nations. DRRs will coordinate district-level Rotaract activity, represent their districts in regional forums, and work with the Executive Board on shared priorities for the year ahead.",
    date: "2025-12-15",
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-drr.jpg",
    },
  },
];

const chronicles = [
  {
    _id: "demo.chronicle.march-2026",
    slug: "march-2026",
    editionName: "March 2026",
    date: "2026-03-01",
    preview:
      "ANANTA countdown, district highlights from across South Asia, and the month ahead for Rotaract leaders.",
    readerUrl: "https://publications.rsamdio.org/",
    image: {
      url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      filename: "demo-chronicle-mar.jpg",
    },
  },
  {
    _id: "demo.chronicle.february-2026",
    slug: "february-2026",
    editionName: "February 2026",
    date: "2026-02-01",
    preview:
      "Summit reflections, service stories from the field, and Secretariat updates for RY 2026–27.",
    readerUrl: "https://publications.rsamdio.org/",
    image: {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      filename: "demo-chronicle-feb.jpg",
    },
  },
  {
    _id: "demo.chronicle.january-2026",
    slug: "january-2026",
    editionName: "January 2026",
    date: "2026-01-01",
    preview:
      "New year priorities, DRR confirmations, and the first look at regional programs for the term.",
    readerUrl: "https://publications.rsamdio.org/",
    image: {
      url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
      filename: "demo-chronicle-jan.jpg",
    },
  },
];

const events = [
  {
    _id: "demo.event.ananta-2026",
    slug: "ananta-2026",
    title: "ANANTA 2026",
    tagline: "17th RSAMDIO Installation Ceremony & ROAR Awards",
    description:
      "The historic 17th Rotaract South Asia MDIO Installation Ceremony and ROAR Awards at Ramada by Wyndham Yelahanka, marking the regional leadership transition for RY 2026–27.",
    body: "Join Rotaractors from across South Asia for installation ceremonies, ROAR Awards, and fellowship in Bengaluru.",
    startDate: "2026-05-23",
    endDate: "2026-05-25",
    startTime: "09:00",
    endTime: "21:00",
    timezoneLabel: "IST",
    location: "Bengaluru, Karnataka, India",
    venue: "Ramada by Wyndham Yelahanka",
    kind: "signature",
    accent: "gold",
    signature: true,
    registrationUrl: "https://ananta.rsamdio.org/",
    registrationLabel: "Visit ANANTA site",
    image: {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
      filename: "demo-event-ananta.jpg",
    },
  },
  {
    _id: "demo.event.presidents-academy-2026",
    slug: "presidents-academy-2026",
    title: "South Asia Rotaract Presidents Academy",
    tagline: "Regional officer leadership training",
    description:
      "An intensive training seminar equipping incoming club presidents with strategic planning, governance, and team-building fundamentals.",
    startDate: "2026-07-18",
    endDate: "2026-07-20",
    startTime: "08:30",
    endTime: "18:00",
    timezoneLabel: "IST",
    location: "Hyderabad, India",
    venue: "To be announced",
    kind: "training",
    accent: "pink",
    signature: true,
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Request details",
    image: {
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
      filename: "demo-event-academy.jpg",
    },
  },
  {
    _id: "demo.event.civic-impact-2026",
    slug: "civic-impact-summit-2026",
    title: "South Asia Civic Impact & CSR Summit",
    tagline: "Community project funding and allocation",
    description:
      "A summit connecting district service chairs with CSR partners and Rotary Foundation grant officers.",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    startTime: "09:00",
    endTime: "17:30",
    timezoneLabel: "IST",
    location: "Colombo, Sri Lanka",
    kind: "regional",
    accent: "blue",
    signature: true,
    image: {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80",
      filename: "demo-event-csr.jpg",
    },
  },
  {
    _id: "demo.event.drr-webinar-aug-2026",
    slug: "drr-onboarding-webinar-aug-2026",
    title: "DRR Onboarding Webinar",
    tagline: "Virtual session for newly confirmed DRRs",
    description:
      "A focused virtual briefing covering MDIO reporting rhythms, brand standards, and regional programs.",
    startDate: "2026-08-08",
    startTime: "19:00",
    endTime: "20:30",
    timezoneLabel: "IST",
    location: "Online",
    venue: "Zoom",
    kind: "session",
    accent: "pink",
    signature: false,
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Register via Secretariat",
  },
  {
    _id: "demo.event.public-image-sep-2026",
    slug: "public-image-clinic-sep-2026",
    title: "Public Image Clinic",
    tagline: "Storytelling & brand clinic for club editors",
    description:
      "A short evening clinic for club and district public-image chairs: framing service stories and RSA Chronicles submissions.",
    startDate: "2026-09-12",
    startTime: "18:30",
    endTime: "20:00",
    timezoneLabel: "IST",
    location: "Online",
    kind: "session",
    accent: "blue",
    signature: false,
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Save your seat",
  },
  {
    _id: "demo.event.summit-2026-past",
    slug: "south-asia-summit-2026",
    title: "South Asia Leadership Summit",
    tagline: "Record regional delegate turnout",
    description:
      "Three days of leadership training and fellowship with representatives from every member nation.",
    startDate: "2026-02-14",
    endDate: "2026-02-16",
    startTime: "09:00",
    location: "South Asia",
    kind: "regional",
    accent: "pink",
    signature: true,
    image: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
      filename: "demo-event-summit.jpg",
    },
  },
];

const programs = [
  {
    _id: "demo.program.service-week",
    slug: "south-asia-service-week",
    title: "South Asia Service Week",
    category: "Service",
    status: "active",
    summary:
      "A region-wide week of coordinated club and district service: health camps, literacy drives, and community clean-ups under one shared banner.",
    livingNote: "RY 2026–27 window · Clubs report projects through their DRR",
    icon: "service",
    accent: "#D41B69",
    featured: true,
    ctaLabel: "Learn more",
    body: "South Asia Service Week brings clubs and districts under one coordinated service banner each Rotary Year.\n\n## How it works\n- Clubs plan local projects under the shared week window\n- Districts collect impact stories and photos through their DRR\n- RSAMDIO amplifies the regional narrative through News & Updates\n\n## Who can join\nAny member club in RSAMDIO nations. Coordinate timing and reporting with your District Rotaract Representative.",
    image: {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-program-service.jpg",
    },
  },
  {
    _id: "demo.program.sports-meet",
    slug: "rotaract-sports-meet",
    title: "Rotaract Sports Meet",
    category: "Sports",
    status: "upcoming",
    summary:
      "Inter-district sports and fellowship that bring Rotaractors together beyond boardrooms: cricket, football, athletics, and team challenges.",
    livingNote: "Hosting bids open · Tentative Q3 regional meet",
    icon: "sports",
    accent: "#F7A81B",
    featured: true,
    ctaLabel: "Learn more",
    body: "The Rotaract Sports Meet is a fellowship-forward gathering that pairs competition with regional friendship.\n\n## Focus areas\n- Team sports and athletics open to club and district squads\n- Host district hospitality and cultural evenings\n- Inclusive formats for mixed skill levels\n\n## Hosting\nDistricts may submit hosting bids to the Secretariat. Dates for the next meet will be published under Events once confirmed.",
    image: {
      url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-program-sports.jpg",
    },
  },
  {
    _id: "demo.program.leaders-series",
    slug: "leaders-series",
    title: "Leaders Series",
    category: "Leadership",
    status: "active",
    summary:
      "A continuing conversation series with Rotary leaders, alumni, and changemakers. Hybrid sessions designed for club and district boards.",
    livingNote: "Monthly sessions · Next guest announced via News",
    icon: "leadership",
    accent: "#17458F",
    featured: true,
    ctaLabel: "Learn more",
    body: "Leaders Series is RSAMDIO's ongoing conversation program for boards and emerging leaders.\n\n## Format\nHybrid sessions with guest speakers from Rotary, Rotaract alumni, and partner organizations. Recordings and takeaways are shared through RSA Chronicles and the News hub when available.\n\n## Who should attend\nClub presidents, district officers, and Rotaractors preparing for leadership roles.",
    image: {
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-program-leaders.jpg",
    },
  },
  {
    _id: "demo.program.fellowship",
    slug: "fellowship-exchanges",
    title: "Cross-Border Fellowship",
    category: "Fellowship",
    status: "seasonal",
    summary:
      "Structured club twinning and short fellowship exchanges that connect Rotaractors across South Asian districts and cultures.",
    livingNote: "Seasonal cohorts · Pairing facilitated by Secretariat",
    icon: "fellowship",
    accent: "#17458F",
    featured: false,
    ctaLabel: "Learn more",
    body: "Cross-Border Fellowship pairs clubs and small cohorts for short exchanges that build lasting regional friendship.\n\n## What to expect\n- Facilitated twinning between districts\n- Host club programs focused on culture, service, and leadership\n- Seasonal application windows announced by the Secretariat",
    image: {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-program-fellowship.jpg",
    },
  },
  {
    _id: "demo.program.green",
    slug: "green-south-asia",
    title: "Green South Asia",
    category: "Environment",
    status: "active",
    summary:
      "A shared environmental campaign: tree planting, climate literacy, and local conservation projects with a common regional impact story.",
    livingNote: "Year-round · District green champions coordinate locally",
    icon: "environment",
    accent: "#059669",
    featured: false,
    ctaLabel: "Learn more",
    body: "Green South Asia is a year-round campaign that helps districts tell one regional environmental story while acting locally.\n\n## Project types\n- Tree planting and urban greening\n- Climate literacy in schools and clubs\n- Conservation partnerships with local organizations\n\nReport outcomes through your DRR so RSAMDIO can amplify shared impact.",
    image: {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      filename: "demo-program-green.jpg",
    },
  },
];

async function main() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset} …`);

  const imageCache = new Map<string, string>();
  async function cachedUpload(img: SeedImage) {
    const hit = imageCache.get(img.url);
    if (hit) return hit;
    process.stdout.write(`  uploading ${img.filename}… `);
    const id = await uploadImageFromUrl(img);
    imageCache.set(img.url, id);
    console.log("ok");
    return id;
  }

  let tx = client.transaction();

  for (const s of stories) {
    const assetId = await cachedUpload(s.image);
    tx = tx.createOrReplace({
      _id: s._id,
      _type: "story",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      category: s.category,
      excerpt: s.excerpt,
      body: s.body,
      date: s.date,
      featured: s.featured,
      image: imageRef(assetId),
    });
  }

  for (const a of announcements) {
    const assetId = await cachedUpload(a.image);
    tx = tx.createOrReplace({
      _id: a._id,
      _type: "announcement",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      category: a.category,
      excerpt: a.excerpt,
      body: a.body,
      date: a.date,
      featured: a.featured,
      image: imageRef(assetId),
    });
  }

  for (const c of chronicles) {
    const assetId = await cachedUpload(c.image);
    tx = tx.createOrReplace({
      _id: c._id,
      _type: "chronicleEdition",
      editionName: c.editionName,
      slug: { _type: "slug", current: c.slug },
      date: c.date,
      preview: c.preview,
      readerUrl: c.readerUrl,
      coverImage: imageRef(assetId),
    });
  }

  for (const e of events) {
    const doc: Record<string, unknown> = {
      _id: e._id,
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
      timezoneLabel: e.timezoneLabel,
      location: e.location,
      venue: e.venue,
      kind: e.kind,
      accent: e.accent,
      signature: e.signature,
      registrationUrl: e.registrationUrl,
      registrationLabel: e.registrationLabel,
    };
    if (e.image) {
      const assetId = await cachedUpload(e.image);
      doc.image = imageRef(assetId);
    }
    tx = tx.createOrReplace(doc as Parameters<typeof tx.createOrReplace>[0]);
  }

  for (const p of programs) {
    const assetId = await cachedUpload(p.image);
    tx = tx.createOrReplace({
      _id: p._id,
      _type: "programInitiative",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      status: p.status,
      summary: p.summary,
      livingNote: p.livingNote,
      icon: p.icon,
      accent: p.accent,
      featured: p.featured,
      ctaLabel: p.ctaLabel,
      body: p.body,
      image: imageRef(assetId),
    });
  }

  console.log("  committing transaction…");
  await tx.commit();

  const counts = await client.fetch<{
    stories: number;
    announcements: number;
    chronicles: number;
    events: number;
    programs: number;
  }>(`{
    "stories": count(*[_type == "story"]),
    "announcements": count(*[_type == "announcement"]),
    "chronicles": count(*[_type == "chronicleEdition"]),
    "events": count(*[_type == "event"]),
    "programs": count(*[_type == "programInitiative"])
  }`);

  console.log("Done. Dataset counts:", counts);
  console.log("Demo docs use ids prefixed with demo.* — safe to delete later in Studio.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
