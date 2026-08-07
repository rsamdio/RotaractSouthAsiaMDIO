// Yearly & evergreen site configuration.
// Update siteConfig.rotaryYear each July when the new administration begins.
// All other content is evergreen.

import { memberDistrictSummary } from "@/config/memberDistricts";

/** Regional footprint claim — fixed; not derived from CSV (some nations may be absent from the directory). */
export const NATION_COUNT = "8";

export const siteConfig = {
  name: "RSAMDIO",
  fullName: "Rotaract South Asia MDIO",
  tagline:
    "Regional MDIO for Rotaract information and communication across South Asia.",
  description:
    "Rotaract South Asia MDIO is a regional group of member districts formed to disseminate information and facilitate communication among Rotaract clubs across 8 nations, and to support leadership learning and multidistrict programs.",
  url: "https://rsamdio.org",
  rotaryYear: "2026–27", // ← update each July
  stats: {
    countries: NATION_COUNT,
    districts: String(memberDistrictSummary.districts),
    clubs: memberDistrictSummary.clubs,
    members: memberDistrictSummary.members,
  },
  libraryUrl: "https://library.rsamdio.org/",
  connectUrl: "https://connect.rsamdio.org",
  social: {
    instagram: "https://instagram.com/rsamdio",
    facebook: "https://www.facebook.com/rsamdio/",
    x: "https://x.com/rsa_mdio",
    youtube: "https://youtube.com/@rsamdio",
    linkedin: "https://linkedin.com/company/rsamdio",
    whatsapp: "https://go.rsamdio.org/WAchannel",
  },
  contact: {
    general: "rsamdio@gmail.com",
    districtUpdate: "rsamdio@gmail.com",
    partnership: "rsamdio@gmail.com",
    media: "rsamdio@gmail.com",
  },
};
