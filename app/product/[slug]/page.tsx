import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${product.categoryName} from Valmaur Store.`,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const priceLabel =
    product.maxPrice > product.price
      ? `${formatPrice(product.price)} – ${formatPrice(product.maxPrice)}`
      : formatPrice(product.price);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href={`/shop?category=${product.categorySlug}`}
        className="text-sm text-accent hover:underline"
      >
        ← {product.categoryName}
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <span className="text-xs uppercase tracking-wide text-accent">
            {product.categoryName}
          </span>
          <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold">{priceLabel}</p>

          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="rounded-full border border-border px-4 py-2 text-sm"
                  >
                    {v.label}
                    {v.price != null ? ` · ${formatPrice(v.price)}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            className="product-description mt-8 text-sm text-foreground/80"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
}
