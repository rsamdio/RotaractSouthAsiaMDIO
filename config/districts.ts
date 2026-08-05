// Country directory for GlobalParticipation / about teasers.
// Member district roster (clubs, members, coverage, highlights, DRRs) lives in
// config/memberDistricts.json + config/memberDistricts.ts.

export type District = {
  slug: string;
  number: string;
  drr: string;
  clubs: string;
  homeClub?: string;
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
      { slug: "3271", number: "3271", drr: "TBD", clubs: "45+" },
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
      { slug: "3011", number: "3011", drr: "TBD", clubs: "120+" },
      { slug: "3012", number: "3012", drr: "Harshita Dhakad", clubs: "100+", homeClub: "Rotaract Club of O.P.Jindal Global University" },
      { slug: "3020", number: "3020", drr: "Prabhu Kalyan Ratnala", clubs: "90+", homeClub: "Rotaract Club of Royal City Bezawada" },
      { slug: "3030", number: "3030", drr: "Yogesh Ashok Jadhav", clubs: "80+", homeClub: "Rotaract Club of Satana Pride" },
      { slug: "3040", number: "3040", drr: "Yashovardhan Kothari", clubs: "80+", homeClub: "Rotaract E-Club of Club of E-Club of Indore Royals" },
      { slug: "3053", number: "3053", drr: "Khushi Chauhan", clubs: "60+", homeClub: "Rotaract Club of Gwalior Heritage" },
      { slug: "3055", number: "3055", drr: "Aneri Nilesh Bhatt", clubs: "70+", homeClub: "Rotaract Club of Ahmedabad Elysium" },
      { slug: "3056", number: "3056", drr: "Aishwarya Singh", clubs: "50+", homeClub: "Rotaract Club of Aishwarya" },
      { slug: "3060", number: "3060", drr: "Bhavya Samirkumar Shah", clubs: "90+", homeClub: "Rotaract Club of Navsari Young Turks" },
      { slug: "3070", number: "3070", drr: "Rohan Tuli", clubs: "60+", homeClub: "Rotaract Club of Ludhiana North" },
      { slug: "3080", number: "3080", drr: "Manu Gupta", clubs: "50+", homeClub: "Rotaract Club of Chandigarh" },
      { slug: "3090", number: "3090", drr: "Kashish Narula", clubs: "40+", homeClub: "Rotaract Club of Nabha Greater" },
      { slug: "3120", number: "3120", drr: "Garima Singh", clubs: "40+", homeClub: "Rotaract Club of Prayagraj Sangam City" },
      { slug: "3131", number: "3131", drr: "Karishma Awari", clubs: "150+", homeClub: "Rotaract Club of Pune Shaniwarwada" },
      { slug: "3132", number: "3132", drr: "Amit Pravin Bhosale", clubs: "80+", homeClub: "Rotaract Club of Karad City" },
      { slug: "3141", number: "3141", drr: "Shreehari Nair", clubs: "160+", homeClub: "Rotaract Club of Bombay Pier" },
      { slug: "3142", number: "3142", drr: "Himanshu R Dapurkar", clubs: "120+", homeClub: "Rotaract Club of Thane Downtown" },
      { slug: "3150", number: "3150", drr: "Sudheeshna Muthyapu", clubs: "180+", homeClub: "Rotaract Club of Sunrise" },
      { slug: "3160", number: "3160", drr: "Managala Purushotham", clubs: "60+", homeClub: "Rotaract Club of Srit" },
      { slug: "3170", number: "3170", drr: "Amey Mangesh Varerkar", clubs: "70+", homeClub: "Rotaract Club of Mapusa" },
      { slug: "3181", number: "3181", drr: "Shree Raksha P P", clubs: "80+", homeClub: "Rotaract Club of Mysore East" },
      { slug: "3182", number: "3182", drr: "Reshma Ramesh", clubs: "60+", homeClub: "Rotaract Club of Manipal Central" },
      { slug: "3191", number: "3191", drr: "Anirudh G Kulkarni", clubs: "100+", homeClub: "Rotaract Club of Bangalore JP Nagar" },
      { slug: "3192", number: "3192", drr: "Sanjay R", clubs: "90+", homeClub: "Rotaract Club of Bangalore Udyog" },
      { slug: "3203", number: "3203", drr: "Varun Kumar", clubs: "70+", homeClub: "Rotaract Club of Udumalpet Yuvas" },
      { slug: "3204", number: "3204", drr: "Sooraj Babu Parambath", clubs: "60+", homeClub: "Rotaract Club of Calicut East" },
      { slug: "3205", number: "3205", drr: "Namith Krishna", clubs: "50+", homeClub: "Rotaract Club of Cochin East" },
      { slug: "3206", number: "3206", drr: "Vijay Vignesh V K", clubs: "80+", homeClub: "Rotaract Club of Coimbatore Gaalaxy" },
      { slug: "3211", number: "3211", drr: "Muhammed Sha S L", clubs: "50+", homeClub: "Rotaract Club of Trivandrum Suburban NSSA" },
      { slug: "3212", number: "3212", drr: "Vigneshwaran Prabakaran", clubs: "40+", homeClub: "Rotaract Club of Virudhunagar" },
      { slug: "3233", number: "3233", drr: "Harivignesh M", clubs: "50+", homeClub: "Rotaract Club of Green Galaxy" },
      { slug: "3234", number: "3234", drr: "Vignesh Chandran", clubs: "70+", homeClub: "Rotaract Club of Coastal Legacy" },
      { slug: "3240", number: "3240", drr: "Pintu Sharma", clubs: "30+", homeClub: "Rotaract Club of Gangtok Hills" },
      { slug: "3250", number: "3250", drr: "Sadashiv Khatri", clubs: "40+", homeClub: "Rotaract Club of Chaibasa" },
      { slug: "3261", number: "3261", drr: "Preeti Prangya Panda", clubs: "40+", homeClub: "Rotaract Club of Rourkela Steel City" },
      { slug: "3262", number: "3262", drr: "Mukesh Kumar Samal", clubs: "50+", homeClub: "Rotaract Club of Bhubaneswar Royal" },
      { slug: "2982", number: "2982", drr: "M Manikandan", clubs: "60+", homeClub: "Rotaract Club of Salem" },
      { slug: "3000", number: "3000", drr: "Harish Amudavel", clubs: "70+", homeClub: "Rotaract Club of Boiler City Trichy" },
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
    districtList: [{ slug: "3292", number: "3292", drr: "Prakash Gaire (Sharma)", clubs: "150+", homeClub: "Rotaract Club of Bhairahawa" }],
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
      { slug: "3281", number: "3281", drr: "TBD", clubs: "70+" },
      { slug: "3282", number: "3282", drr: "TBD", clubs: "70+" },
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
    districtList: [{ slug: "3220", number: "3220", drr: "Jude Shannon Lucian", clubs: "120+", homeClub: "Rotaract Club of Kandy Metropolitan" }],
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
