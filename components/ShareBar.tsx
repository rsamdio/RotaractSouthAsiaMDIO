"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Link2, Send, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";

type Props = {
  /** Path only, e.g. `/news/my-slug` or `/events/ananta-2026` */
  path: string;
  title: string;
  /** Optional category / kind chip (e.g. "Service", "Announcement") */
  tag?: string;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconBtn =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FCE8F1] text-[#0B1426] transition hover:bg-[#F7A81B] hover:text-[#0B1426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/40";

const iconBtnPrimary =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#D41B69] text-white transition hover:bg-[#9A0E4E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/40";

export function ShareBar({ path, title, tag }: Props) {
  const absoluteUrl = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedTitle = encodeURIComponent(title);

  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      setCanNativeShare(false);
      return;
    }
    const payload = { title, text: title, url: absoluteUrl };
    try {
      setCanNativeShare(
        !navigator.canShare || navigator.canShare(payload),
      );
    } catch {
      setCanNativeShare(true);
    }
  }, [absoluteUrl, title]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const shareNative = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, text: title, url: absoluteUrl });
    } catch {
      /* user cancelled */
    } finally {
      setOpen(false);
    }
  }, [absoluteUrl, title]);

  const copyLink = useCallback(async () => {
    const confirm = () => {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 900);
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(absoluteUrl);
        confirm();
        return;
      }
    } catch {
      /* fall through */
    }
    window.prompt("Copy this link:", absoluteUrl);
    setOpen(false);
  }, [absoluteUrl]);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
      <span className="text-sm font-semibold text-[#0B1426]">Share</span>

      <div className="flex flex-wrap items-center gap-2">
        <a
          className={iconBtn}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          aria-label="Share on X"
        >
          <XIcon className="h-4 w-4" />
        </a>
        <a
          className={iconBtn}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://facebook.com/sharer.php?u=${encodedUrl}`}
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <a
          className={iconBtn}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`}
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>

        <div className="relative" ref={rootRef}>
          <button
            type="button"
            className={iconBtnPrimary}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-controls={menuId}
            aria-label="Share this page"
            onClick={() => setOpen((v) => !v)}
          >
            <Share2 className="h-5 w-5" strokeWidth={2.25} />
          </button>

          {open ? (
            <div
              id={menuId}
              role="menu"
              className="absolute left-0 top-full z-[60] mt-2 min-w-[14.5rem] rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg"
            >
              {canNativeShare ? (
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-[#0B1426] transition hover:bg-[#FCE8F1]"
                  onClick={() => {
                    void shareNative();
                  }}
                >
                  <Send className="h-4 w-4 shrink-0 text-[#D41B69]" />
                  <span className="whitespace-nowrap">Share via device…</span>
                </button>
              ) : null}
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-[#0B1426] transition hover:bg-[#FCE8F1]"
                onClick={() => {
                  void copyLink();
                }}
              >
                {copied ? (
                  <Check className="h-4 w-4 shrink-0 text-[#0f766e]" />
                ) : (
                  <Link2 className="h-4 w-4 shrink-0 text-slate-600" />
                )}
                <span className="whitespace-nowrap">
                  {copied ? "Copied!" : "Copy link"}
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {tag ? (
        <span className="rounded-full bg-[#FCE8F1] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D41B69] sm:ml-1">
          {tag}
        </span>
      ) : null}
    </div>
  );
}
