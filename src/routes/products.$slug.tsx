import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct, PRODUCTS, waLink, type PackSize } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Rice — Grainery" }] };
    return {
      meta: [
        { title: `${p.name} — Grainery` },
        { name: "description", content: `${p.tagline}. ${p.description.slice(0, 120)}` },
        { property: "og:title", content: `${p.name} — Grainery` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: `/products/${p.slug}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Rice not found</h1>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-primary-foreground">
        Back to catalogue
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [pack, setPack] = useState<PackSize>(product.packs[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-secondary">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Link to="/products" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← {product.category}
          </Link>
          <h1 className="mt-3 font-serif text-5xl text-foreground">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>· In stock</span>
          </div>

          <div className="mt-7 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Pack size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.packs.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setPack(s)}
                  className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
                    pack.label === s.label
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {s.label} · {formatINR(s.price)}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
                <p className="font-serif text-4xl text-foreground">{formatINR(pack.price * qty)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatINR(Math.round(pack.price / pack.kg))} / kg</p>
              </div>
              <div className="inline-flex items-center rounded-full border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg">−</button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-lg">+</button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  add(
                    {
                      slug: product.slug,
                      name: product.name,
                      image: product.image,
                      packLabel: pack.label,
                      kg: pack.kg,
                      unitPrice: pack.price,
                    },
                    qty,
                  );
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
              </button>
              <a
                href={waLink(`Hi Grainery, I'd like to order ${qty} × ${pack.label} of ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                WhatsApp order
              </a>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-xs text-muted-foreground">
              <Truck className="h-4 w-4 text-foreground" />
              Free delivery on orders above ₹999. Dispatch within 48 hours.
            </div>
          </div>

          <div className="mt-7">
            <h2 className="font-serif text-2xl">About this rice</h2>
            <p className="mt-3 text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Origin", product.origin],
              ["Cooking time", product.cookingTime],
              ["Shelf life", product.shelfLife],
              ["Bulk", `${formatINR(product.bulkPrice.pricePerKg)}/kg from ${product.bulkPrice.fromKg} kg`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="mt-1 text-foreground">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-serif text-xl">Nutrition · per 100 g (uncooked)</h3>
            <dl className="mt-4 grid grid-cols-4 gap-4 text-sm">
              {(Object.entries(product.nutrition) as [string, string][]).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-serif text-xl text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground">You may also like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
