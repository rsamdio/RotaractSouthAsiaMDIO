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
    title: "Regional leadership takes formal shape",
    summary:
      "RSAMDIO's presidential record begins with Rotary Year 2010–11, marking the start of continuous regional leadership for Rotaract South Asia.",
  },
  {
    period: "2011–2020",
    title: "A decade of multi-district continuity",
    summary:
      "Successive Rotary Years strengthened coordination across member districts, with the College of Presidents preserving institutional memory year after year.",
  },
  {
    period: "2020s",
    title: "Digital tools for district and club boards",
    summary:
      "RSAMDIO expanded its digital ecosystem to support administration and collaboration, including the Rotaract Library, dues tools, Certify, Publications Hub, and related platforms.",
  },
  {
    period: `Rotary Year ${siteConfig.rotaryYear}`,
    title: "Presence across South Asia today",
    summary:
      `Today RSAMDIO coordinates Rotaract across ${memberDistrictSummary.countries} nations, ${memberDistrictSummary.districts} member districts, ${memberDistrictSummary.clubs} clubs, and ${memberDistrictSummary.members} Rotaractors, guided by the elected Executive Board for Rotary Year ${siteConfig.rotaryYear}.`,
  },
];
