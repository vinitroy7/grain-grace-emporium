import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PHONE_DISPLAY, waLink } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & bulk enquiry — Grainery" },
      { name: "description", content: "Reach Grainery for retail support or wholesale rice quotes. Bulk enquiries answered within 1 business day." },
      { property: "og:title", content: "Contact Grainery" },
      { property: "og:description", content: "Retail support · Wholesale quotes · WhatsApp & phone." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  type: z.enum(["retail", "wholesale", "general"]),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      type: fd.get("type"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get in touch</p>
      <h1 className="mt-2 font-serif text-5xl text-foreground md:text-6xl">Let's talk rice.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Bulk quote, retail support, or just curious about a harvest — we read every message and reply within one business day.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-8">
          {sent ? (
            <div className="rounded-xl bg-secondary p-8 text-center">
              <h2 className="font-serif text-2xl">Thank you — we'll be in touch.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                For urgent orders, ping us on WhatsApp.{" "}
                <a href={waLink("Hello Grainery")} className="underline" target="_blank" rel="noopener noreferrer">Open WhatsApp →</a>
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} />
                <Field label="Email" name="email" type="email" error={errors.email} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" error={errors.phone} />
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Enquiry type</label>
                  <select name="type" defaultValue="retail" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                    <option value="retail">Retail order</option>
                    <option value="wholesale">Wholesale / bulk</option>
                    <option value="general">General question</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea name="message" rows={5} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Send enquiry
              </button>
            </div>
          )}
        </form>

        <div className="space-y-4">
          <InfoCard icon={Phone} label="Call us" value={PHONE_DISPLAY} />
          <InfoCard icon={Mail} label="Email" value="hello@grainery.in" />
          <InfoCard icon={MapPin} label="Visit" value="Mill Road, Karol Bagh, New Delhi 110005" />
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Grainery location"
              src="https://www.google.com/maps?q=Karol+Bagh,+New+Delhi&output=embed"
              className="aspect-square w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
        <Icon className="h-5 w-5 text-foreground" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}
