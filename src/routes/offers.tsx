import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { waLink } from "@/lib/products";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & deals — Grainery" },
      { name: "description", content: "Festive offers, free delivery, bulk discounts and combo packs on premium rice from Grainery." },
      { property: "og:title", content: "Grainery offers & festive deals" },
      { property: "og:description", content: "Save more on premium basmati, sona masoori, jasmine and matta rice." },
    ],
    links: [{ rel: "canonical", href: "/offers" }],
  }),
  component: OffersPage,
});

const OFFERS = [
  { tag: "Festive", title: "Diwali stock-up · 10% off", body: "10% off on every 25 kg basmati pack. Auto-applied at checkout.", code: "DIWALI10" },
  { tag: "Always on", title: "Free delivery on ₹999+", body: "Free pan-India delivery on every order above ₹999.", code: "FREESHIP" },
  { tag: "Wholesale", title: "Mill-direct bulk pricing", body: "Tiered pricing from 100 kg. Custom packs and dedicated account manager.", code: "Quote" },
  { tag: "Combo", title: "Pantry pair · save ₹120", body: "5 kg Basmati 1121 + 5 kg Sona Masoori at a combined price.", code: "PAIR120" },
  { tag: "Subscribe & save", title: "Monthly auto-delivery · 8% off", body: "Set a delivery cadence and we'll handle the rest.", code: "AUTO8" },
  { tag: "First order", title: "₹100 off first order", body: "On orders above ₹599. Use at checkout.", code: "WELCOME100" },
];

function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live offers</p>
      <h1 className="mt-2 font-serif text-5xl text-foreground md:text-6xl">Save on every harvest.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Festive discounts, bulk pricing, free delivery — automatically applied where eligible.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((o) => (
          <div key={o.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground shadow-gold">
                {o.tag}
              </span>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-foreground">{o.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{o.body}</p>
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-4">
              <code className="rounded-md bg-secondary px-2 py-1 text-xs text-foreground">{o.code}</code>
              <Link to="/products" className="text-xs font-medium text-foreground underline-offset-4 hover:underline">
                Shop now →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-foreground p-10 text-primary-foreground md:p-14">
        <h2 className="font-serif text-3xl md:text-4xl">Need a custom wholesale quote?</h2>
        <p className="mt-3 max-w-xl text-primary-foreground/80">Tell us your monthly volume and preferred rice — we'll send a tiered price sheet.</p>
        <a href={waLink("Hi Grainery, I'd like a custom wholesale quote.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-gold">
          WhatsApp for quote
        </a>
      </div>
    </div>
  );
}
