import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

export type Variant = {
  id: string;
  label: string;
  price: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  categorySlug: string;
  description: string;
  price: number;
  maxPrice: number;
  images: string[];
  variants: Variant[];
};

export type Category = {
  slug: string;
  name: string;
};

export const products = productsData as Product[];
export const categories = categoriesData as Category[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug?: string): Product[] {
  if (!categorySlug) return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1);
  }
  return counts;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
