import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PACK_SIZES, PRODUCTS } from "@/lib/products";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop rice — Grainery" },
      {
        name: "description",
        content:
          "Browse Grainery's premium rice collection — basmati, sona masoori, matta, jasmine and brown rice. Filter by type, pack size and price.",
      },
      { property: "og:title", content: "Shop premium rice — Grainery" },
      { property: "og:description", content: "Filter by type, pack size and price." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q } = Route.useSearch();
  const [search, setSearch] = useState(q ?? "");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [pack, setPack] = useState<(typeof PACK_SIZES)[number]>("All");
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (pack !== "All" && !p.packs.some((s) => s.label === pack)) return false;
      if (search && !`${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.packs[0].price - b.packs[0].price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.packs[0].price - a.packs[0].price);
    if (sort === "popular") list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular));
    return list;
  }, [search, category, pack, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catalogue</p>
      <h1 className="mt-2 font-serif text-5xl text-foreground md:text-6xl">All rice</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Hand-picked harvests across India and South Asia. Retail packs and wholesale tiers in one place.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="space-y-7 rounded-2xl border border-border bg-card p-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rice type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    category === c
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pack size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PACK_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPack(s)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    pack === s
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sort by</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
            </select>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} {filtered.length === 1 ? "result" : "results"}</span>
            <Link to="/products" search={{}} className="hover:text-foreground">Reset</Link>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center text-muted-foreground">
              No rice matches your filters yet. Try widening your search.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
