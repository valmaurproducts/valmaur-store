import Link from "next/link";
import { categories, getCategoryCounts, products } from "@/lib/products";

export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const counts = getCategoryCounts();
  const sorted = [...categories].sort(
    (a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0)
  );

  return (
    <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
      <Link
        href="/shop"
        className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
          !activeSlug
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border hover:border-accent"
        }`}
      >
        All ({products.length})
      </Link>
      {sorted.map((c) => (
        <Link
          key={c.slug}
          href={`/shop?category=${c.slug}`}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
            activeSlug === c.slug
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border hover:border-accent"
          }`}
        >
          {c.name} ({counts.get(c.slug) ?? 0})
        </Link>
      ))}
    </div>
  );
}
