import Link from "next/link";
import { CategoryNav } from "@/components/category-nav";
import { ProductCard } from "@/components/product-card";
import { categories, getProductsByCategory } from "@/lib/products";

const PAGE_SIZE = 24;

export const metadata = {
  title: "Shop",
};

export default async function ShopPage(props: PageProps<"/shop">) {
  const searchParams = await props.searchParams;
  const categorySlug =
    typeof searchParams.category === "string" ? searchParams.category : undefined;
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;

  const allProducts = getProductsByCategory(categorySlug);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = allProducts.slice(start, start + PAGE_SIZE);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">
        {activeCategory ? activeCategory.name : "All products"}
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        {allProducts.length} products
      </p>

      <div className="mt-6">
        <CategoryNav activeSlug={categorySlug} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pageProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const params = new URLSearchParams();
            if (categorySlug) params.set("category", categorySlug);
            if (n > 1) params.set("page", String(n));
            const href = params.size ? `/shop?${params.toString()}` : "/shop";
            return (
              <Link
                key={n}
                href={href}
                className={`h-9 min-w-9 rounded-full border px-3 text-center text-sm leading-9 ${
                  n === currentPage
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent"
                }`}
              >
                {n}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
