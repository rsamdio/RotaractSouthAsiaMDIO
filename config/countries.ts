export type Country = {
  flag: string;
  code: string;
  country: string;
  capital: string;
  districts: string;
  clubs: string;
  desc: string;
};

export const countryData: Record<string, Country> = {
  default: {
    flag: "🌍",
    code: "globe",
    country: "Rotaract South Asia",
    capital: "8 Member Nations",
    districts: "38+ Districts",
    clubs: "3,500+ Clubs",
    desc: "Unifying regional district committees, streamlining brand communication, and supporting collective youth-led action across 8 nations.",
  },
  afg: {
    flag: "🇦🇫",
    code: "af",
    country: "Afghanistan",
    capital: "Member Nation",
    districts: "Non-districted",
    clubs: "5+ Clubs",
    desc: "Coordinating humanitarian relief, strategic networking, and youth career pathways under direct MDIO supervision.",
  },
  pak: {
    flag: "🇵🇰",
    code: "pk",
    country: "Pakistan",
    capital: "Member Nation",
    districts: "Districts 3271 & 3272",
    clubs: "80+ Clubs",
    desc: "Pioneering primary literacy schools, dynamic clean water networks, and community development actions.",
  },
  ind: {
    flag: "🇮🇳",
    code: "in",
    country: "India",
    capital: "Member Nation",
    districts: "30+ Active Districts",
    clubs: "2,500+ Clubs",
    desc: "Executing massive national initiatives focusing on medical camps, standard literacy models, and CSR collaboration.",
  },
  nep: {
    flag: "🇳🇵",
    code: "np",
    country: "Nepal",
    capital: "Member Nation",
    districts: "District 3292",
    clubs: "150+ Clubs",
    desc: "Driving high-altitude ecological conservation, rural health support, and active student career development seminars.",
  },
  bhu: {
    flag: "🇧🇹",
    code: "bt",
    country: "Bhutan",
    capital: "Member Nation",
    districts: "Non-districted",
    clubs: "5+ Clubs",
    desc: "Upholding rural livelihood improvements, community service, and youth leadership training in mountainous regions.",
  },
  ban: {
    flag: "🇧🇩",
    code: "bd",
    country: "Bangladesh",
    capital: "Member Nation",
    districts: "Districts 3281 & 3282",
    clubs: "140+ Clubs",
    desc: "Strengthening flood emergency relief operations, public health campaigns, and leadership seminars.",
  },
  sri: {
    flag: "🇱🇰",
    code: "lk",
    country: "Sri Lanka",
    capital: "Member Nation",
    districts: "District 3220",
    clubs: "120+ Clubs",
    desc: "Renowned for vocational literacy setups, strategic environmental cleanup actions, and dynamic regional leadership assemblies.",
  },
  mal: {
    flag: "🇲🇻",
    code: "mv",
    country: "Maldives",
    capital: "Member Nation",
    districts: "Sub-region of D3220",
    clubs: "5+ Clubs",
    desc: "Actively spearheading marine ecology awareness campaigns, clean coral reef actions, and island community outreach.",
  },
};
