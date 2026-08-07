"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Lock } from "lucide-react";
import {
  DESKTOP_VIEWPORT_WIDTH,
  type PlatformTool,
} from "@/config/platformTools";

type Props = {
  tool: PlatformTool;
  /** Taller preview shell (initiatives page). */
  tall?: boolean;
};

export function LiveSitePreview({ tool, tall = false }: Props) {
  const [loaded, setLoaded] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [metrics, setMetrics] = useState<{ scale: number; height: number } | null>(
    null
  );
  const previewBg = tool.previewBg ?? "#ffffff";
  const minH = tall
    ? "min-h-[380px] sm:min-h-[440px] lg:min-h-[520px]"
    : "min-h-[300px] sm:min-h-[340px]";

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width <= 0 || height <= 0) return;
      const scale = width / DESKTOP_VIEWPORT_WIDTH;
      setMetrics({ scale, height: height / scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [tool.previewUrl]);

  useEffect(() => {
    if (!metrics) return;
    setLoaded(false);
    const failsafe = window.setTimeout(() => setLoaded(true), 1800);
    return () => window.clearTimeout(failsafe);
  }, [tool.previewUrl, metrics]);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame || !metrics) return;

    const markLoaded = () => setLoaded(true);
    frame.addEventListener("load", markLoaded);
    try {
      if (frame.contentWindow?.document?.readyState === "complete") {
        markLoaded();
      }
    } catch {
      // Cross-origin — ignore
    }

    return () => frame.removeEventListener("load", markLoaded);
  }, [tool.previewUrl, metrics]);

  if (!tool.embeddable) {
    return (
      <a
        href={tool.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative block h-full ${minH} bg-ice-cream overflow-hidden group`}
      >
        {tool.fallbackImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tool.fallbackImage}
            alt={`${tool.title} website preview`}
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200" />
        )}
        <div className="absolute inset-0 bg-[#0B1426]/35 group-hover:bg-[#0B1426]/45 transition" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] sm:text-xs font-bold text-[#0B1426] shadow-lg">
            <Lock className="h-3 w-3 text-[#D41B69]" />
            Live embed blocked by site security
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-lg">
            <ExternalLink className="h-3.5 w-3.5" />
            Open {tool.displayUrl}
          </span>
        </div>
      </a>
    );
  }

  return (
    <div
      ref={shellRef}
      className={`relative flex-1 ${minH} w-full overflow-hidden`}
      style={{ backgroundColor: previewBg }}
    >
      {!loaded && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-[11px] font-bold uppercase tracking-wider text-slate-500"
          style={{ backgroundColor: previewBg }}
        >
          Loading live preview…
        </div>
      )}
      {metrics && (
        <iframe
          ref={iframeRef}
          key={tool.previewUrl}
          src={tool.previewUrl}
          title={`${tool.title} live preview`}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute left-0 top-0 border-0"
          style={{
            width: DESKTOP_VIEWPORT_WIDTH,
            height: metrics.height,
            backgroundColor: previewBg,
            transform: `scale(${metrics.scale})`,
            transformOrigin: "top left",
          }}
        />
      )}
      <a
        href={tool.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#0B1426]/85 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold text-white backdrop-blur transition hover:bg-[#D41B69]"
      >
        <ExternalLink className="h-3 w-3" /> Open site
      </a>
    </div>
  );
}

export function BrowserChrome({
  tool,
  tall = false,
  className = "",
}: {
  tool: PlatformTool;
  tall?: boolean;
  className?: string;
}) {
  const shellMin = tall
    ? "min-h-[28rem] sm:min-h-[34rem] lg:min-h-[40rem]"
    : "min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]";
  const frameMin = tall
    ? "min-h-[24rem] sm:min-h-[30rem] lg:min-h-[36rem]"
    : "min-h-[320px] sm:min-h-[380px]";

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/20 bg-[#0B1426]/75 p-3.5 shadow-2xl backdrop-blur-md sm:rounded-[2.5rem] sm:p-5 ${shellMin} ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D41B69]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#17458F]/30 blur-3xl" />

      <div
        className={`relative z-10 flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:rounded-3xl ${frameMin}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3.5 py-2.5 sm:px-5 sm:py-3">
          <div className="flex gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D41B69] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F7A81B] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 sm:h-3 sm:w-3" />
          </div>
          <a
            href={tool.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[70%] truncate rounded-full border border-slate-200 bg-white px-3 py-0.5 text-[9px] font-bold text-slate-600 transition hover:text-[#D41B69] sm:px-3.5 sm:py-1 sm:text-[11px]"
          >
            {tool.displayUrl}
          </a>
        </div>
        <LiveSitePreview tool={tool} tall={tall} />
      </div>
    </div>
  );
}
