"use client";

type Props = {
  showing: number;
  total: number;
  onLoadMore: () => void;
  /** Noun for the caught-up line, e.g. "stories" */
  itemLabel?: string;
};

export function LoadMoreButton({
  showing,
  total,
  onLoadMore,
  itemLabel = "items",
}: Props) {
  if (total === 0) return null;

  const exhausted = showing >= total;

  return (
    <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
      <p className="text-sm text-slate-500">
        {exhausted ? (
          <>
            Showing {total} of {total}
            <span className="text-slate-400"> · You&apos;re all caught up</span>
          </>
        ) : (
          <>
            Showing {showing} of {total} {itemLabel}
          </>
        )}
      </p>
      {!exhausted && (
        <button
          type="button"
          onClick={onLoadMore}
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-crimson px-7 py-3 text-sm font-bold text-white shadow-md shadow-crimson/20 transition hover:bg-crimson-hover"
        >
          Load more
        </button>
      )}
    </div>
  );
}
