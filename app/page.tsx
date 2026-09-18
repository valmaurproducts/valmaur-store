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
    .slice(0, 6);

  const featured = pickFeatured(8);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-24 text-center">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            Gold plated jewelry for everyday elegance
          </h1>
          <p className="max-w-xl text-foreground/70">
            Necklaces, earrings, bracelets and rings designed to layer,
            stack, and stand out.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Ver catálogo
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-6 pb-10">
          {topCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent"
            >
              {c.name}
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
