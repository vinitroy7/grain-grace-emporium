import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & delivery — Grainery" },
      { name: "description", content: "Delivery timelines, payment options, returns and bulk-order FAQs for Grainery rice." },
      { property: "og:title", content: "FAQ & delivery — Grainery" },
      { property: "og:description", content: "Delivery, payments, returns and bulk-order answers." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  { q: "Where do you deliver?", a: "We deliver across India through trusted logistics partners. Most metros receive orders within 2–4 business days." },
  { q: "What payment options are available?", a: "UPI, debit/credit cards, net banking, popular wallets and cash on delivery on eligible pin codes. Online checkout launches shortly — for now, place orders via WhatsApp." },
  { q: "Do you offer wholesale pricing?", a: "Yes. Tiered pricing begins at 100 kg with significant savings for restaurants, kitchens and traders. Request a quote on WhatsApp or via our contact form." },
  { q: "How is rice packaged?", a: "Retail packs ship in food-grade kraft paper with an inner vacuum-sealed liner. Bulk orders ship in PP-laminated jute or HDPE bags." },
  { q: "What is your return policy?", a: "If a pack is damaged in transit, share a photo within 48 hours and we'll ship a free replacement." },
  { q: "How fresh is the rice?", a: "Basmati is aged 18–24 months for elongation and aroma. Non-aged varieties are dispatched within 3 months of milling." },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Help centre</p>
      <h1 className="mt-2 font-serif text-5xl text-foreground md:text-6xl">FAQ & delivery.</h1>
      <p className="mt-4 text-muted-foreground">Everything you might want to know before placing an order.</p>

      <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {FAQS.map((f) => (
          <details key={f.q} className="group p-6 open:bg-secondary/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-serif text-lg text-foreground">{f.q}</span>
              <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
