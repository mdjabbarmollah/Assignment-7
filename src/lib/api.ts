import type { Category, Product } from "@/lib/utils";

export const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Category[];
  } catch {
    return [];
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
};


export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
};


export const getProductsByCategory = async (
  slug: string
): Promise<Product[]> => {
  try {
    const res = await fetch(
      `${API_BASE}/products?category=${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
};


export const getCategoryBySlug = async (
  slug: string
): Promise<Category | undefined> => {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
};