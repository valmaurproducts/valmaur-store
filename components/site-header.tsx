import Image from "next/image";
import Link from "next/link";
import { categories, getCategoryCounts } from "@/lib/products";

export function SiteHeader() {
  const counts = getCategoryCounts();
  const topCategories = [...categories]
    .sort((a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0))
    .slice(0, 5);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Image src="/logo.jpg" alt="Valmaur Products" width={56} height={56} priority className="h-14 w-14 object-contain" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-foreground/70 md:flex">
          {topCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="transition-colors hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <Link
          href="/shop"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Shop all
        </Link>
      </div>
    </header>
  );
}
