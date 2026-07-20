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

export type ZoneDistrict = {
  number: string;
  drr: string;
  clubs: string;
  country: string;
  isNonMDIO?: boolean; // To flag Russia
};

export type Zone = {
  slug: string;
  zoneNumber: string;
  title: string;
  districtsCount: string;
  clubsCount: string;
  desc: string;
  countries: {
    name: string;
    flagCode: string;
  }[];
  districts: ZoneDistrict[];
};

export const zoneData: Record<string, Zone> = {
  "zone-4": {
    slug: "zone-4",
    zoneNumber: "Zone 4",
    title: "Western & Northern South Asia",
    districtsCount: "3 Districts & 1 Non-Districted Region",
    clubsCount: "235+ Clubs",
    desc: "Coordinating youth leadership and community development across Western India, Pakistan, and Afghanistan.",
    countries: [
      { name: "Pakistan", flagCode: "pk" },
      { name: "Afghanistan", flagCode: "af" },
      { name: "India", flagCode: "in" }
    ],
    districts: [
      { number: "3271", drr: "Sana Malik", clubs: "45+", country: "Pakistan" },
      { number: "3272", drr: "TBD", clubs: "35+", country: "Pakistan" },
      { number: "3131", drr: "Meera Nair", clubs: "155+", country: "India" },
      { number: "Non-districted", drr: "Kabir Noorzai", clubs: "5+", country: "Afghanistan" }
    ]
  },
  "zone-5": {
    slug: "zone-5",
    zoneNumber: "Zone 5",
    title: "Southern South Asia",
    districtsCount: "2 Districts & 1 Sub-Region",
    clubsCount: "305+ Clubs",
    desc: "Empowering communities through ecological preservation, literacy programs, and vocational training across Southern India, Sri Lanka, and the Maldives.",
    countries: [
      { name: "Sri Lanka", flagCode: "lk" },
      { name: "Maldives", flagCode: "mv" },
      { name: "India", flagCode: "in" }
    ],
    districts: [
      { number: "3220", drr: "Dilani Perera", clubs: "120+", country: "Sri Lanka" },
      { number: "Sub-region of D3220", drr: "Ibrahim Nazim", clubs: "5+", country: "Maldives" },
      { number: "3150", drr: "Arun Teja Godavarthi", clubs: "180+", country: "India" }
    ]
  },
  "zone-6": {
    slug: "zone-6",
    zoneNumber: "Zone 6",
    title: "Eastern South Asia",
    districtsCount: "2 Districts & 1 Non-Districted Region",
    clubsCount: "245+ Clubs",
    desc: "Driving high-altitude ecological conservation, rural livelihood improvements, and student career programs across Eastern India, Nepal, and Bhutan.",
    countries: [
      { name: "Nepal", flagCode: "np" },
      { name: "Bhutan", flagCode: "bt" },
      { name: "India", flagCode: "in" }
    ],
    districts: [
      { number: "3292", drr: "Anish Shrestha", clubs: "150+", country: "Nepal" },
      { number: "Non-districted", drr: "Tashi Wangmo", clubs: "5+", country: "Bhutan" },
      { number: "3291", drr: "Priya Sharma", clubs: "90+", country: "India" }
    ]
  },
  "zone-7": {
    slug: "zone-7",
    zoneNumber: "Zone 7",
    title: "Central & Bengal Regions",
    districtsCount: "2 Districts",
    clubsCount: "140+ Clubs",
    desc: "Strengthening flood emergency relief operations, public health campaigns, and leadership training across Bangladesh and Central India.",
    countries: [
      { name: "Bangladesh", flagCode: "bd" }
    ],
    districts: [
      { number: "3281", drr: "Farhan Chowdhury", clubs: "70+", country: "Bangladesh" },
      { number: "3282", drr: "Nadia Islam", clubs: "70+", country: "Bangladesh" }
    ]
  },
  "zone-8": {
    slug: "zone-8",
    zoneNumber: "Zone 8",
    title: "Northern & Partner Regions",
    districtsCount: "2 Districts",
    clubsCount: "135+ Clubs",
    desc: "Fostering regional partnerships, service projects, and professional networks across Northern India, with relations extending to Zone 8 partners.",
    countries: [
      { name: "India", flagCode: "in" },
      { name: "Russia", flagCode: "ru" }
    ],
    districts: [
      { number: "3011", drr: "Vikram Rao", clubs: "120+", country: "India" },
      { number: "2223", drr: "TBD", clubs: "15+", country: "Russia", isNonMDIO: true }
    ]
  }
};

export const zoneList = Object.values(zoneData);
