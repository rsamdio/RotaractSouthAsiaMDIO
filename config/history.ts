import { siteConfig } from "@/config/site";
import { memberDistrictSummary } from "@/config/memberDistricts";

export type HistoryMilestone = {
  period: string;
  title: string;
  summary: string;
};

/**
 * Organizational history V1 for /about.
 * Anchored to presidential years and public milestones already recorded in-repo.
 * Refine with Secretariat-validated dates when available.
 */
export const organizationHistory: HistoryMilestone[] = [
  {
    period: "Rotary Year 2010–11",
    title: "Regional MDIO record begins",
    summary:
      "RSAMDIO's presidential record begins with Rotary Year 2010–11, marking continuous regional service for Rotaract South Asia as a multidistrict information organization.",
  },
  {
    period: "2011–2020",
    title: "A decade of multi-district continuity",
    summary:
      "Successive Rotary Years deepened information sharing and communication across member districts, with the College of Presidents preserving institutional memory year after year.",
  },
  {
    period: "2020s",
    title: "Platforms that support the region",
    summary:
      "RSAMDIO expanded platforms that help disseminate information and connect clubs across the region, including the Rotaract Library, dues platforms, Certify, Publications Hub, and related initiatives.",
  },
  {
    period: `Rotary Year ${siteConfig.rotaryYear}`,
    title: "Presence across South Asia today",
    summary: `Today RSAMDIO brings together member districts across ${siteConfig.stats.countries} nations, ${memberDistrictSummary.districts} districts, ${memberDistrictSummary.clubs} clubs, and ${memberDistrictSummary.members} Rotaractors, guided by the Executive Board under an elected President for Rotary Year ${siteConfig.rotaryYear}.`,
  },
];
