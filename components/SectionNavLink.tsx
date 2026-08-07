"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { stashScrollToSection, scrollToSection } from "@/lib/scrollToSection";

type Props = {
  href: string;
  /** Scroll to this section id after navigation (or immediately if already on `href`). No URL hash. */
  scrollTo?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "onClick" | "children" | "className">;

/** Navigate to a page and scroll to a section without writing a hash into the URL. */
export function SectionNavLink({ href, scrollTo, children, className, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!scrollTo) return;

    e.preventDefault();

    if (pathname === href) {
      scrollToSection(scrollTo);
      return;
    }

    stashScrollToSection(scrollTo);
    router.push(href, { scroll: false });
  };

  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
