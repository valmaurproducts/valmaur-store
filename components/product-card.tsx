import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const priceLabel =
    product.maxPrice > product.price
      ? `${formatPrice(product.price)} – ${formatPrice(product.maxPrice)}`
      : formatPrice(product.price);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs uppercase tracking-wide text-accent">
          {product.categoryName}
        </span>
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">
          {product.name}
        </h3>
        <span className="mt-auto pt-1 text-sm font-semibold">
          {priceLabel}
        </span>
      </div>
    </Link>
  );
}
