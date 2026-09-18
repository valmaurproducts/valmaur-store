import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, getCategoryCounts, products } from "@/lib/products";

function pickFeatured(count: number) {
  const seen = new Set<string>();
  const featured = [];
  for (const p of products) {
    if (seen.has(p.categorySlug)) continue;
    seen.add(p.categorySlug);
    featured.push(p);
    if (featured.length >= count) break;
  }
  return featured;
}

export default function Home() {
  const counts = getCategoryCounts();
  const topCategories = [...categories]
    .sort((a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0))
    .slice(0, 6)
    .map((c) => ({
      ...c,
      count: counts.get(c.slug) ?? 0,
      image: products.find((p) => p.categorySlug === c.slug)?.images[0],
    }));

  const featured = pickFeatured(8);

  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-20">
          <span className="text-sm uppercase tracking-[0.3em] text-accent">
            Fashion jewelry
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            Gold plated pieces for everyday elegance
          </h1>
          <p className="max-w-xl text-foreground/70">
            Necklaces, earrings, bracelets and rings designed to layer,
            stack, and stand out.
          </p>
          <Link
            href="/shop"
            className="mt-4 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-xl font-semibold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {topCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border bg-muted">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs text-foreground/50">
                {c.count} items
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Best sellers</h2>
          <Link href="/shop" className="text-sm text-accent hover:underline">
            View all {products.length} products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
