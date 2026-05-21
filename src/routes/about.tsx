import { createFileRoute } from "@tanstack/react-router";
import { Award, Leaf, Sprout, Users } from "lucide-react";
import heroImg from "@/assets/hero-rice.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Grainery" },
      {
        name: "description",
        content:
          "Grainery sources, ages and ships premium rice direct from mill partners across India. Read our story.",
      },
      { property: "og:title", content: "About Grainery" },
      { property: "og:description", content: "Mill-direct, lab-tested, family-run since 1986." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Sprout, title: "Grower-first", body: "We pay above-market rates so farmers can invest back into their land." },
  { icon: Award, title: "Aged, never rushed", body: "Every basmati lot sits in our silos for at least 18 months." },
  { icon: Leaf, title: "Honest sourcing", body: "Single-origin, traceable to the mill — and printed on every pack." },
  { icon: Users, title: "Built for households & kitchens", body: "From a 1 kg pantry pack to a 500 kg restaurant order." },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-warm">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Since 1986</p>
            <h1 className="mt-3 font-serif text-5xl text-foreground md:text-6xl">A three-generation rice family.</h1>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Grainery began as a small rice mill in Karnal, Haryana. Forty years later, we work with 22 partner mills
              across India, ageing and shipping rice the way our grandfather did — slowly, carefully, and never out of stock.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img src={heroImg} alt="Rice grains" width={1600} height={1100} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-serif text-4xl text-foreground md:text-5xl">What we stand for.</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          ["1986", "First mill in Karnal"],
          ["2014", "First wholesale partnership"],
          ["2026", "Pan-India direct-to-home"],
        ].map(([yr, lbl]) => (
          <div key={yr} className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="font-serif text-5xl text-foreground">{yr}</div>
            <p className="mt-2 text-sm text-muted-foreground">{lbl}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
