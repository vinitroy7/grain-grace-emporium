import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatINR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const min = product.packs[0];
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/70 backdrop-blur">
          {product.category}
        </span>
        {product.popular && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground shadow-gold">
            Bestseller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span>{product.rating}</span>
          <span>· {product.packs.length} pack sizes</span>
        </div>
        <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
            <div className="font-serif text-2xl text-foreground">{formatINR(min.price)}</div>
          </div>
          <span className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
