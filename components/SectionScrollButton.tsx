"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { scrollToSection } from "@/lib/scrollToSection";

type Props = {
  sectionId: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "children" | "className">;

/** Smooth-scroll to an in-page section without writing a hash into the URL. */
export function SectionScrollButton({ sectionId, children, className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => scrollToSection(sectionId)}
      {...rest}
    >
      {children}
    </button>
  );
}
