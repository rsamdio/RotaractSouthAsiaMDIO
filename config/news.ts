// News & Media directory — placeholder but realistically structured content.
// Replace with real Secretariat-authored stories, releases, and publications.

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  image: string;
  date: string; // ISO date
  featured?: boolean;
};

export const stories: Story[] = [
  {
    slug: "rebuilding-after-floods-district-3220",
    title: "Rebuilding After Floods in District 3220",
    category: "Service",
    excerpt: "A joint effort that provided temporary housing for over 500 displaced families across coastal Sri Lanka.",
    body: "Clubs across District 3220 mobilized within 48 hours of seasonal flooding, coordinating temporary housing, clean water access, and school-supply drives for over 500 displaced families. The relief effort drew volunteers from 12 clubs and was supported by a Rotary Foundation disaster-response grant.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-02",
    featured: true,
  },
  {
    slug: "south-asia-summit-record-attendance",
    title: "South Asia Summit Concludes With Record Attendance",
    category: "Leadership",
    excerpt: "Over 1,200 delegates from 8 nations gathered for three days of leadership training and fellowship.",
    body: "This year's regional summit drew the largest delegate turnout in MDIO history, with representatives from every member nation attending workshops on governance, public image, and cross-border project design.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-18",
  },
  {
    slug: "clean-water-project-nepal",
    title: "Clean Water Access Reaches Three Himalayan Villages",
    category: "Service",
    excerpt: "District 3292 clubs installed sand-filtration systems benefiting over 450 schoolchildren.",
    body: "Rotaractors in District 3292 partnered with local health authorities to install heavy-duty sand filtration systems in three rural schools, providing safe drinking water to more than 450 children daily.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&crop=entropy&fit=crop&w=1200&q=80",
    date: "2026-01-22",
  },
];

export type PressRelease = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export const pressReleases: PressRelease[] = [
  {
    slug: "ananta-2026-announcement",
    title: "RSAMDIO Announces ANANTA 2026 Installation Ceremony",
    date: "2026-01-10",
    summary: "The 17th RSA MDIO Installation Ceremony and ROAR Awards will be hosted in Bengaluru, India, marking the start of RY 2026–27.",
  },
  {
    slug: "new-drr-appointments",
    title: "RSAMDIO Confirms District Rotaract Representative Appointments for RY 2026–27",
    date: "2025-12-15",
    summary: "Eight District Rotaract Representatives have been confirmed across the region's member nations for the incoming Rotary Year.",
  },
];

export type Publication = {
  slug: string;
  title: string;
  period: string;
  url: string;
};

export const publications: Publication[] = [
  {
    slug: "annual-impact-report-2025-26",
    title: "Secretariat Annual Impact Report",
    period: "RY 2025–26",
    url: "https://library.rsamdio.org/",
  },
  {
    slug: "documenting-expenses",
    title: "Financial Expense Guidelines",
    period: "Reference",
    url: "https://library.rsamdio.org/resources/documenting_expenses_en.pdf",
  },
  {
    slug: "grants-faq",
    title: "Grants Participation FAQs",
    period: "Reference",
    url: "https://library.rsamdio.org/resources/grants-how-rotaractors-can-participate-frequently-asked-questions-en.pdf",
  },
];

export const galleryImages: string[] = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
