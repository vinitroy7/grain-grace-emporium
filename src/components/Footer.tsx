import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE, PHONE_DISPLAY } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold">
              <span className="font-serif text-lg leading-none">G</span>
            </span>
            <span className="font-serif text-2xl">{BRAND_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{BRAND_TAGLINE}</p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All rice</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Basmati</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Sona Masoori</Link></li>
            <li><Link to="/offers" className="hover:text-foreground">Offers & deals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ & delivery</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Bulk enquiry</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg">Visit us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Mill Road, Karol Bagh, New Delhi 110005</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {PHONE_DISPLAY}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> hello@grainery.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>FSSAI Lic. 10012345678901 · GST 07AAAAA0000A1Z5</p>
        </div>
      </div>
    </footer>
  );
}
