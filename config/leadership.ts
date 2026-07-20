// Leadership directory — update each July when the new administration begins.
// DRRs, Committee Members, and Past Leadership are starter/representative
// entries; the Secretariat should expand these to the full roster over time.

export type LeadershipMember = {
  name: string;
  title: string;
  district: string;
  country: string;
  image?: string;
  role?: string;
};

export const executiveBoard: LeadershipMember[] = [
  {
    name: "Arun Teja Godavarthi",
    title: "MDIO President",
    district: "District 3150",
    country: "India",
    image: "/img/profile1.png",
    role: "president",
  },
  {
    name: "Priya Sharma",
    title: "Vice Chairperson",
    district: "District 3291",
    country: "Nepal",
    image: "/img/profile2.png",
    role: "vp",
  },
  {
    name: "Rahul Fernando",
    title: "Secretary General",
    district: "District 3220",
    country: "Sri Lanka",
    image: "/img/profile3.png",
    role: "secretary",
  },
  {
    name: "Ayesha Khan",
    title: "Treasurer",
    district: "District 3271",
    country: "Pakistan",
    image: "/img/profile4.png",
    role: "treasurer",
  },
];

// District Rotaract Representatives — one representative example per member
// nation. Full 38+ district roster to be supplied by the Secretariat.
export const drrs: LeadershipMember[] = [
  { name: "Kabir Noorzai", title: "DRR", district: "Non-districted", country: "Afghanistan" },
  { name: "Farhan Chowdhury", title: "DRR, District 3281", district: "District 3281", country: "Bangladesh" },
  { name: "Tashi Wangmo", title: "DRR", district: "Non-districted", country: "Bhutan" },
  { name: "Meera Nair", title: "DRR, District 3131", district: "District 3131", country: "India" },
  { name: "Anish Shrestha", title: "DRR, District 3292", district: "District 3292", country: "Nepal" },
  { name: "Sana Malik", title: "DRR, District 3272", district: "District 3272", country: "Pakistan" },
  { name: "Dilani Perera", title: "DRR, District 3220", district: "District 3220", country: "Sri Lanka" },
  { name: "Ibrahim Nazim", title: "DRR", district: "Sub-region of D3220", country: "Maldives" },
];

export const committeeMembers: LeadershipMember[] = [
  { name: "Nadia Islam", title: "Chair, Public Image", district: "District 3282", country: "Bangladesh" },
  { name: "Vikram Rao", title: "Chair, Service & Impact", district: "District 3011", country: "India" },
  { name: "Ishara Fonseka", title: "Chair, Fellowship & Exchange", district: "District 3220", country: "Sri Lanka" },
  { name: "Zara Ahmed", title: "Chair, Leadership Development", district: "District 3271", country: "Pakistan" },
  { name: "Bikash Gurung", title: "IT & Digital Chair", district: "District 3292", country: "Nepal" },
  { name: "Riya Kapoor", title: "Editor, Publications", district: "District 3141", country: "India" },
];

export type PastLeadershipYear = {
  year: string;
  president: string;
  country: string;
};

// Most recent terms first.
export const pastLeadership: PastLeadershipYear[] = [
  { year: "2025–26", president: "Devan Wickramasinghe", country: "Sri Lanka" },
  { year: "2024–25", president: "Simran Kaur", country: "India" },
  { year: "2023–24", president: "Faisal Rahman", country: "Bangladesh" },
];
