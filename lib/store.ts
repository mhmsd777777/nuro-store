import { supabase } from "@/lib/supabase";
import { products as fallbackProducts, type Product } from "@/lib/products";

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  icon: string | null;
  badge: string | null;
  active: boolean;
};

export async function getStoreProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,category,description,icon,badge,active")
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error || !data?.length) return fallbackProducts;

  return (data as DbProduct[]).map((p) => ({
    id: p.slug,
    name: p.name,
    category: p.category,
    description: p.description || "",
    icon: p.icon || "✦",
    ...(p.badge ? { badge: p.badge } : {}),
  }));
}
