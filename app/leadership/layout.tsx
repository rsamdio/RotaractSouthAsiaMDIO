import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { executiveBoard } from "@/config/leadership";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbNode,
  buildPageMetadata,
  graph,
  itemListPersonNode,
  organizationNode,
  webSiteNode,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Leadership & DRRs",
  description: `Meet the Rotaract South Asia MDIO Executive Board, District Rotaract Representatives (DRRs), and Committee Members serving Rotaract South Asia for RY ${siteConfig.rotaryYear}.`,
  path: "/leadership",
});

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          breadcrumbNode([{ name: "Leadership & DRRs", path: "/leadership" }]),
          itemListPersonNode({
            name: `Executive Board RY ${siteConfig.rotaryYear}`,
            path: "/leadership",
            members: executiveBoard,
          })
        )}
      />
      {children}
    </>
  );
}
