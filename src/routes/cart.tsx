import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR, waLink } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Grainery" },
      { name: "description", content: "Review your rice order and check out securely with Grainery." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 60;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a pack of premium rice to get started.</p>
        <Link to="/products" className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground">
          Browse rice →
        </Link>
      </div>
    );
  }

  const waText = `Hi Grainery, I'd like to order:\n${items
    .map((i) => `• ${i.qty} × ${i.packLabel} ${i.name} — ${formatINR(i.qty * i.unitPrice)}`)
    .join("\n")}\nSubtotal: ${formatINR(subtotal)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl text-foreground">Your cart</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={`${i.slug}-${i.packLabel}`} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <Link to="/products/$slug" params={{ slug: i.slug }} className="shrink-0">
                <img src={i.image} alt={i.name} width={120} height={120} className="h-24 w-24 rounded-xl object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to="/products/$slug" params={{ slug: i.slug }} className="font-serif text-lg text-foreground hover:underline">
                      {i.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{i.packLabel} · {formatINR(i.unitPrice)} each</p>
                  </div>
                  <button onClick={() => remove(i.slug, i.packLabel)} aria-label="Remove" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(i.slug, i.packLabel, i.qty - 1)} className="grid h-9 w-9 place-items-center text-foreground"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.packLabel, i.qty + 1)} className="grid h-9 w-9 place-items-center text-foreground"><Plus className="h-4 w-4" /></button>
                  </div>
                  <div className="font-serif text-xl text-foreground">{formatINR(i.qty * i.unitPrice)}</div>
                </div>
              </div>
            </li>
          ))}
          <button onClick={clear} className="text-xs text-muted-foreground underline-offset-4 hover:underline">Clear cart</button>
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl text-foreground">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
            <div className="my-3 border-t border-border" />
            <Row label={<span className="font-serif text-lg text-foreground">Total</span>} value={<span className="font-serif text-xl text-foreground">{formatINR(total)}</span>} />
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">Free delivery on orders ≥ ₹999 · COD available on most pin codes.</p>

          <button
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground opacity-70"
            title="Online checkout launching shortly"
          >
            Secure checkout (coming soon)
          </button>
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-medium text-white"
          >
            Place order on WhatsApp
          </a>
          <Link to="/products" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">
            Continue shopping →
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
