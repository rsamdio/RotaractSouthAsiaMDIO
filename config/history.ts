import { siteConfig } from "@/config/site";
import { memberDistrictSummary } from "@/config/memberDistricts";

export type HistoryMilestone = {
  period: string;
  title: string;
  summary: string;
  /** Optional document or photo under the summary */
  image?: {
    src: string;
    alt: string;
  };
};

/**
 * Organizational history V1 for /about.
 * Anchored to presidential years and public milestones already recorded in-repo.
 * Refine with Secretariat-validated dates when available.
 */
export const organizationHistory: HistoryMilestone[] = [
  {
    period: "Rotary Year 2010–11",
    title: "Foundation of Rotaract South Asia MDIO",
    summary:
      "The formation of the Rotaract South Asia MDIO received official certification on Jul 19, 2010 from General Secretary Ed Futa, acting on behalf of the Rotary International Board. The initial founding districts comprised Districts 3080, 3150, 3160, 3190, 3260, and 3291.",
    image: {
      src: "/img/about/rsamdio-charter.jpeg",
      alt: "Decision of the 2010–11 RI Board of Directors authorizing formation of Rotaract South Asia Multidistrict Information Organization, signed 19 July 2010",
    },
  },
  {
    period: "2011–2020",
    title: "A decade of multi-district continuity",
    summary:
      "Successive Rotary Years deepened information sharing and communication across member districts, with the College of Presidents preserving institutional memory year after year.",
  },
  {
    period: `Rotary Year ${siteConfig.rotaryYear}`,
    title: "Presence across South Asia today",
    summary: `Today RSAMDIO brings together member districts across ${siteConfig.stats.countries} nations, ${memberDistrictSummary.districts} districts, ${memberDistrictSummary.clubs} clubs, and ${memberDistrictSummary.members} Rotaractors, guided by the Executive Board under an elected President for Rotary Year ${siteConfig.rotaryYear}.`,
  },
];
