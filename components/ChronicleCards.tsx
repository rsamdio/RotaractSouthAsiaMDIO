import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ChronicleEdition } from "@/config/news";

/** A4 portrait — cover preview frame */
const COVER_ASPECT = "aspect-[210/297]";

function formatReleaseDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = {
  editions: ChronicleEdition[];
  /** When true, first card gets a larger featured treatment */
  featuredFirst?: boolean;
};

export function ChronicleCards({ editions, featuredFirst = false }: Props) {
  if (editions.length === 0) return null;

  if (featuredFirst && editions.length > 0) {
    const [latest, ...rest] = editions;
    return (
      <div className="space-y-8">
        <ChronicleFeaturedCard edition={latest} />
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((edition) => (
              <ChronicleCard key={edition.slug} edition={edition} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {editions.map((edition) => (
        <ChronicleCard key={edition.slug} edition={edition} />
      ))}
    </div>
  );
}

function CoverPreview({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-white shadow-[0_12px_40px_-12px_rgba(11,20,38,0.35)] ring-1 ring-black/5 ${COVER_ASPECT} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}

function ChronicleFeaturedCard({ edition }: { edition: ChronicleEdition }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
      <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-10 lg:p-10">
        <div className="mx-auto w-full max-w-[200px] lg:mx-0 lg:max-w-none">
          <CoverPreview
            src={edition.heroImage}
            alt={`RSA Chronicles ${edition.editionName} cover`}
          />
        </div>
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
            Latest edition
          </p>
          <h3
            className="mt-3 text-2xl font-bold tracking-tight text-[#0B1426] sm:text-3xl"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            RSA Chronicles: {edition.editionName}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Released {formatReleaseDate(edition.date)}
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">{edition.preview}</p>
          <a
            href={edition.readerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 self-center rounded-full bg-[#D41B69] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#9A0E4E] lg:self-start"
          >
            Read edition
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ChronicleCard({ edition }: { edition: ChronicleEdition }) {
  return (
    <article className="group flex flex-col rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-[#D41B69]/25 hover:shadow-md sm:p-6">
      <div className="mx-auto w-full max-w-[180px]">
        <CoverPreview
          src={edition.heroImage}
          alt={`RSA Chronicles ${edition.editionName} cover`}
          className="transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_44px_-14px_rgba(11,20,38,0.4)]"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D41B69]">
          {edition.editionName}
        </p>
        <p className="mt-1.5 text-xs text-slate-400">
          {formatReleaseDate(edition.date)}
        </p>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{edition.preview}</p>
        <a
          href={edition.readerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#D41B69] transition hover:underline"
        >
          Open reader
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export function ChronicleSectionHeader({
  title = "Publications",
  subtitle,
  href,
  linkLabel,
}: {
  title?: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2
          className="text-2xl font-bold text-[#0B1426]"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{subtitle}</p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="text-sm font-bold text-[#D41B69] transition hover:underline"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
