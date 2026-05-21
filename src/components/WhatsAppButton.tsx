import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/products";

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello Grainery, I'd like to place a rice order.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white shadow-gold transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp order</span>
    </a>
  );
}
