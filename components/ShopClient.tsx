"use client";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import type { Product } from "@/lib/products";
import { categories } from "@/lib/products";
import { useMemo, useState } from "react";

export default function ShopClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (!q ||
            [p.name, p.description, p.category]
              .join(" ")
              .toLowerCase()
              .includes(q.toLowerCase()))
      ),
    [q, cat, products]
  );

  return (
    <>
      <SectionTitle
        eyebrow="SHOP"
        title="المتجر"
        description="تصفح جميع المنتجات الرقمية. لا نعرض الأسعار داخل المتجر."
      />
      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_260px]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-slate-600 focus:border-blue-400/50"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
        >
          <option value="all">كل الأقسام</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5 text-sm text-slate-500">{list.length} منتج</div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {!list.length && (
        <div className="glass rounded-3xl p-10 text-center text-slate-400">
          ما لقينا منتج مطابق للبحث.
        </div>
      )}
    </>
  );
}
