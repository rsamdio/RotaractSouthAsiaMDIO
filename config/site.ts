// Yearly & evergreen site configuration.
// Update siteConfig.rotaryYear each July when the new administration begins.
// All other content is evergreen.

import { memberDistrictSummary } from "@/config/memberDistricts";

export const siteConfig = {
  name: "RSAMDIO",
  fullName: "Rotaract South Asia MDIO",
  tagline: "Create Lasting Impact",
  description:
    "The regional coordination hub for Rotaract across South Asia, serving clubs and members in 8 nations through shared knowledge, standards, and service.",
  url: "https://rsamdio.org",
  rotaryYear: "2026–27", // ← update each July
  stats: {
    countries: String(memberDistrictSummary.countries),
    districts: String(memberDistrictSummary.districts),
    clubs: memberDistrictSummary.clubs,
    members: memberDistrictSummary.members,
  },
  libraryUrl: "https://library.rsamdio.org/",
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
