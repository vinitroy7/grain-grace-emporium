import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Award, Leaf, Search, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-rice.jpg";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, waLink } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grainery — Premium rice wholesale & retail in India" },
      {
        name: "description",
        content:
          "Shop aged basmati, sona masoori, jasmine and matta rice. Retail packs from 1 kg, wholesale bulk pricing from 25 kg. Free delivery on orders over ₹999.",
      },
      { property: "og:title", content: "Grainery — Premium rice wholesale" },
      {
        property: "og:description",
        content: "Aged basmati, sona masoori and more — retail & bulk, delivered.",
      },
      { property: "og:image", content: heroImg },
      { property: "twitter:image", content: heroImg },
      { rel: "canonical", href: "/" } as never,
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const OFFERS = [
  { title: "Diwali stock-up", body: "10% off on 25 kg basmati packs", tag: "Festive" },
  { title: "Free delivery", body: "On all orders above ₹999 across India", tag: "Always on" },
  { title: "Bulk pricing", body: "Special mill-direct rates from 100 kg", tag: "Wholesale" },
];

const WHY = [
  { icon: Award, title: "24-month aged", body: "Climate-controlled silos for the perfect grain elongation." },
  { icon: Leaf, title: "Single-origin mills", body: "Sourced directly from Punjab, Andhra and Kerala growers." },
  { icon: ShieldCheck, title: "Lab-tested purity", body: "Every lot is sorted, sieved and tested for purity ≥ 99.5%." },
  { icon: Truck, title: "Mill-fresh delivery", body: "Vacuum-sealed and shipped within 48 hours of dispatch." },
];

const TESTIMONIALS = [
  { name: "Priya R.", role: "Home chef · Mumbai", body: "The 1121 basmati is the closest thing to my grandmother's biryani rice. Long, fluffy and aromatic." },
  { name: "Hotel Saffron", role: "Wholesale buyer · Jaipur", body: "We've moved our entire kitchen to Grainery. The bulk pricing and consistency are unmatched." },
  { name: "Arjun K.", role: "Restaurant owner · Bengaluru", body: "Reliable supply, transparent pricing, and rice that actually smells the way it should." },
];

function Index() {
  const featured = PRODUCTS.filter((p) => p.popular);
  const [q, setQ] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              New harvest 2026
            </span>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              Premium rice,<br />harvested with intent.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              From the mills of Punjab, Andhra and Kerala — aged, sorted and shipped to your kitchen or warehouse.
              Retail packs from 1 kg, wholesale pricing from 25 kg.
            </p>

            <form
              className="mt-7 flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/products?q=${encodeURIComponent(q)}`;
              }}
            >
              <Search className="ml-3 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search basmati, sona, jasmine…"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop rice <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink("Hi Grainery, I'd like a bulk quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Request bulk quote
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 text-left">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Mill partners</dt>
                <dd className="font-serif text-2xl text-foreground">22+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Tonnes shipped</dt>
                <dd className="font-serif text-2xl text-foreground">9,400</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Cities served</dt>
                <dd className="font-serif text-2xl text-foreground">180</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-soft">
              <img
                src={heroImg}
                alt="Golden basmati rice spilling from a burlap sack"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-soft sm:block">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Aged</div>
              <div className="font-serif text-3xl text-foreground">24 mo.</div>
            </div>
            <div className="absolute -right-4 top-8 hidden rounded-2xl border border-border bg-card p-4 shadow-soft sm:block">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Purity</div>
              <div className="font-serif text-3xl text-foreground">99.7%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          {OFFERS.map((o) => (
            <div
              key={o.title}
              className="flex min-w-[280px] items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4"
            >
              <span className="rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground shadow-gold">
                {o.tag}
              </span>
              <div>
                <div className="font-serif text-base text-foreground">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">Our favourite harvests</h2>
          </div>
          <Link to="/products" className="hidden text-sm text-foreground/80 underline-offset-4 hover:underline sm:block">
            View all rice →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Grainery</p>
          <h2 className="mt-2 max-w-2xl font-serif text-4xl text-foreground md:text-5xl">
            Built on grower trust, lab-tested for purity.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-foreground">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-foreground text-primary-foreground">
          <div className="grid items-center gap-8 p-10 md:grid-cols-2 md:p-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Wholesale</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Bulk orders for hotels, kitchens and traders.</h2>
              <p className="mt-4 max-w-lg text-primary-foreground/80">
                Tiered pricing from 100 kg, custom packaging, dedicated account manager, and pan-India dispatch within 48 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={waLink("Hi Grainery, I'd like a wholesale quote for bulk rice.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-gold transition-transform hover:scale-[1.02]"
              >
                WhatsApp for quote
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
              >
                Submit enquiry form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loved by</p>
        <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">Homes, hotels and traders.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7">
              <blockquote className="font-serif text-lg leading-snug text-foreground">“{t.body}”</blockquote>
              <figcaption className="mt-auto">
                <div className="text-sm font-medium text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-warm p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl text-foreground md:text-4xl">
            Harvest stories & festive offers — once a month.
          </h2>
          <form
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-soft"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
