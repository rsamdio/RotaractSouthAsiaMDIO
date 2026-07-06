// South Asia country & district directory.
// District-level entries are representative examples per country, not an
// exhaustive 38+ district roster — extend `districts` as the Secretariat
// supplies full data.

export type District = {
  slug: string;
  number: string;
  drr: string;
  clubs: string;
};

export type Country = {
  slug: string;
  flag: string;
  code: string; // ISO 3166-1 alpha-2, or "globe" for the default/aggregate entry
  country: string;
  capital: string;
  districts: string; // human-readable summary, e.g. "Districts 3271 & 3272"
  clubs: string;
  desc: string;
  districtList?: District[];
};

export const countryData: Record<string, Country> = {
  default: {
    slug: "south-asia",
    flag: "🌍",
    code: "globe",
    country: "Rotaract South Asia",
    capital: "8 Member Nations",
    districts: "38+ Districts",
    clubs: "3,500+ Clubs",
    desc: "Unifying regional district committees, streamlining brand communication, and supporting collective youth-led action across 8 nations.",
  },
  afg: {
    slug: "afghanistan",
    flag: "🇦🇫",
    code: "af",
    country: "Afghanistan",
    capital: "Member Nation",
    districts: "Non-districted",
    clubs: "5+ Clubs",
    desc: "Coordinating humanitarian relief, strategic networking, and youth career pathways under direct MDIO supervision.",
  },
  pak: {
    slug: "pakistan",
    flag: "🇵🇰",
    code: "pk",
    country: "Pakistan",
    capital: "Member Nation",
    districts: "Districts 3271 & 3272",
    clubs: "80+ Clubs",
    desc: "Pioneering primary literacy schools, dynamic clean water networks, and community development actions.",
    districtList: [
      { slug: "3271", number: "3271", drr: "Sana Malik", clubs: "45+" },
      { slug: "3272", number: "3272", drr: "TBD", clubs: "35+" },
    ],
  },
  ind: {
    slug: "india",
    flag: "🇮🇳",
    code: "in",
    country: "India",
    capital: "Member Nation",
    districts: "30+ Active Districts",
    clubs: "2,500+ Clubs",
    desc: "Executing massive national initiatives focusing on medical camps, standard literacy models, and CSR collaboration.",
    districtList: [
      { slug: "3150", number: "3150", drr: "Arun Teja Godavarthi", clubs: "180+" },
      { slug: "3131", number: "3131", drr: "Meera Nair", clubs: "150+" },
      { slug: "3011", number: "3011", drr: "Vikram Rao", clubs: "120+" },
    ],
  },
  nep: {
    slug: "nepal",
    flag: "🇳🇵",
    code: "np",
    country: "Nepal",
    capital: "Member Nation",
    districts: "District 3292",
    clubs: "150+ Clubs",
    desc: "Driving high-altitude ecological conservation, rural health support, and active student career development seminars.",
    districtList: [{ slug: "3292", number: "3292", drr: "Anish Shrestha", clubs: "150+" }],
  },
  bhu: {
    slug: "bhutan",
    flag: "🇧🇹",
    code: "bt",
    country: "Bhutan",
    capital: "Member Nation",
    districts: "Non-districted",
    clubs: "5+ Clubs",
    desc: "Upholding rural livelihood improvements, community service, and youth leadership training in mountainous regions.",
  },
  ban: {
    slug: "bangladesh",
    flag: "🇧🇩",
    code: "bd",
    country: "Bangladesh",
    capital: "Member Nation",
    districts: "Districts 3281 & 3282",
    clubs: "140+ Clubs",
    desc: "Strengthening flood emergency relief operations, public health campaigns, and leadership seminars.",
    districtList: [
      { slug: "3281", number: "3281", drr: "Farhan Chowdhury", clubs: "70+" },
      { slug: "3282", number: "3282", drr: "Nadia Islam", clubs: "70+" },
    ],
  },
  sri: {
    slug: "sri-lanka",
    flag: "🇱🇰",
    code: "lk",
    country: "Sri Lanka",
    capital: "Member Nation",
    districts: "District 3220",
    clubs: "120+ Clubs",
    desc: "Renowned for vocational literacy setups, strategic environmental cleanup actions, and dynamic regional leadership assemblies.",
    districtList: [{ slug: "3220", number: "3220", drr: "Dilani Perera", clubs: "120+" }],
  },
  mal: {
    slug: "maldives",
    flag: "🇲🇻",
    code: "mv",
    country: "Maldives",
    capital: "Member Nation",
    districts: "Sub-region of D3220",
    clubs: "5+ Clubs",
    desc: "Actively spearheading marine ecology awareness campaigns, clean coral reef actions, and island community outreach.",
  },
};

export const countryList = Object.entries(countryData).filter(([key]) => key !== "default");
