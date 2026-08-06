import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories } from "@/config/news";

export function StoriesGallery() {
  const [main, second, third] = stories;

  if (!main) return null;

  return (
    <section className="py-24 px-5 sm:px-6 lg:px-8 bg-[#0B1426]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            Latest Stories
          </h2>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F7A81B] hover:text-white transition"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:h-[520px]">
          <Link
            href={`/news/${main.slug}`}
            className="rounded-[2rem] overflow-hidden relative group block h-full lg:row-span-2 lg:col-span-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={main.image}
              alt={main.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/85 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F7A81B]">
                {main.category}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">{main.title}</h3>
            </div>
          </Link>

          {second && (
            <Link
              href={`/news/${second.slug}`}
              className="rounded-[2rem] overflow-hidden relative group block h-full min-h-[240px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={second.image}
                alt={second.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/85 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-lg font-bold text-white">{second.title}</h3>
              </div>
            </Link>
          )}

          {third && (
            <Link
              href={`/news/${third.slug}`}
              className="rounded-[2rem] overflow-hidden relative group block h-full min-h-[240px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={third.image}
                alt={third.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/85 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-lg font-bold text-white">{third.title}</h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
