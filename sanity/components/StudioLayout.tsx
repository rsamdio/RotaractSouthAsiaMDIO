"use client";

import type { LayoutProps } from "sanity";
import { StudioListContrast } from "./StudioListContrast";

export function StudioLayout(props: LayoutProps) {
  return (
    <>
      <StudioListContrast />
      {props.renderDefault(props)}
    </>
  );
}
