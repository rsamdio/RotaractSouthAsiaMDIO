type FlagSize = "sm" | "md" | "lg";

const sizeClass: Record<FlagSize, string> = {
  sm: "h-5 w-7 rounded-md sm:h-6 sm:w-9",
  md: "h-12 w-16 rounded-lg sm:h-14 sm:w-20",
  lg: "h-14 w-[4.5rem] rounded-xl sm:h-16 sm:w-24",
};

type Props = {
  code: string;
  /** Accessible name; empty string marks decorative */
  alt?: string;
  size?: FlagSize;
  className?: string;
  /** Soft hover lift (home nation tiles) */
  interactive?: boolean;
};

/**
 * Consistent flagcdn tile. Nepal uses contain + padding (non-rectangular flag).
 */
export function FlagTile({
  code,
  alt = "",
  size = "md",
  className = "",
  interactive = false,
}: Props) {
  const nepal = code === "np";
  const srcWidth = size === "sm" ? 80 : 160;

  return (
    <div
      className={`relative overflow-hidden border border-slate-200/60 bg-white shadow-sm ${sizeClass[size]} ${
        interactive
          ? "transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
          : ""
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w${srcWidth}/${code}.png`}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${
          nepal ? "object-contain p-1.5 scale-110" : "object-cover"
        }`}
      />
    </div>
  );
}
