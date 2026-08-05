type Props = {
  className?: string;
};

/**
 * Official Rotary Mark of Excellence (black master with true alpha),
 * tinted via currentColor mask so it matches surrounding icon color.
 */
export function RotaryMarkIcon({ className = "h-3.5 w-3.5" }: Props) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        WebkitMaskImage: "url(/img/icons/rotary-mark.png)",
        maskImage: "url(/img/icons/rotary-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        maskMode: "alpha",
      }}
    />
  );
}
