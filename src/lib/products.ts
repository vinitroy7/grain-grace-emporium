import basmati from "@/assets/product-basmati.jpg";
import sona from "@/assets/product-sona.jpg";
import matta from "@/assets/product-matta.jpg";
import jasmine from "@/assets/product-jasmine.jpg";

export type PackSize = { label: string; kg: number; price: number };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: "Basmati" | "Sona Masoori" | "Matta" | "Jasmine" | "Brown";
  image: string;
  popular: boolean;
  rating: number;
  description: string;
  origin: string;
  cookingTime: string;
  shelfLife: string;
  packs: PackSize[];
  bulkPrice: { fromKg: number; pricePerKg: number };
  nutrition: { calories: string; protein: string; carbs: string; fat: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: "royal-basmati-1121",
    name: "Royal Basmati 1121",
    tagline: "Extra-long aged basmati",
    category: "Basmati",
    image: basmati,
    popular: true,
    rating: 4.9,
    description:
      "Aged for 24 months in climate-controlled silos, our 1121 basmati delivers a 9mm cooked grain length, intense aroma and non-sticky fluffy texture — the gold standard for biryani.",
    origin: "Punjab, India",
    cookingTime: "12–14 min",
    shelfLife: "18 months",
    packs: [
      { label: "1 kg", kg: 1, price: 220 },
      { label: "5 kg", kg: 5, price: 1050 },
      { label: "10 kg", kg: 10, price: 1980 },
      { label: "25 kg", kg: 25, price: 4750 },
    ],
    bulkPrice: { fromKg: 100, pricePerKg: 178 },
    nutrition: { calories: "356 kcal", protein: "7.5 g", carbs: "78 g", fat: "0.9 g" },
  },
  {
    slug: "sona-masoori-premium",
    name: "Sona Masoori Premium",
    tagline: "Light, fragrant everyday rice",
    category: "Sona Masoori",
    image: sona,
    popular: true,
    rating: 4.8,
    description:
      "A lightweight, aromatic medium-grain rice from the Krishna belt. Hand-polished, double-sorted and ideal for daily meals, pongal and idli batter.",
    origin: "Andhra Pradesh, India",
    cookingTime: "15 min",
    shelfLife: "12 months",
    packs: [
      { label: "1 kg", kg: 1, price: 95 },
      { label: "5 kg", kg: 5, price: 450 },
      { label: "10 kg", kg: 10, price: 870 },
      { label: "25 kg", kg: 25, price: 2100 },
    ],
    bulkPrice: { fromKg: 100, pricePerKg: 78 },
    nutrition: { calories: "349 kcal", protein: "6.8 g", carbs: "77 g", fat: "0.6 g" },
  },
  {
    slug: "red-matta-parboiled",
    name: "Red Matta Parboiled",
    tagline: "Iron-rich Kerala matta",
    category: "Matta",
    image: matta,
    popular: false,
    rating: 4.7,
    description:
      "Traditional Palakkad matta, parboiled and sun-dried. Earthy, nutty, fibre-rich and perfect for puttu, kanji and Kerala-style meals.",
    origin: "Palakkad, Kerala",
    cookingTime: "25 min",
    shelfLife: "12 months",
    packs: [
      { label: "1 kg", kg: 1, price: 110 },
      { label: "5 kg", kg: 5, price: 520 },
      { label: "10 kg", kg: 10, price: 990 },
    ],
    bulkPrice: { fromKg: 50, pricePerKg: 92 },
    nutrition: { calories: "362 kcal", protein: "7.1 g", carbs: "76 g", fat: "1.2 g" },
  },
  {
    slug: "thai-jasmine-fragrant",
    name: "Thai Jasmine Fragrant",
    tagline: "Soft, floral long grain",
    category: "Jasmine",
    image: jasmine,
    popular: true,
    rating: 4.8,
    description:
      "Imported Thai Hom Mali jasmine rice with a delicate floral aroma and tender, slightly clingy texture — the perfect base for Asian curries and stir-fries.",
    origin: "Surin, Thailand",
    cookingTime: "12 min",
    shelfLife: "18 months",
    packs: [
      { label: "1 kg", kg: 1, price: 180 },
      { label: "5 kg", kg: 5, price: 850 },
      { label: "10 kg", kg: 10, price: 1650 },
    ],
    bulkPrice: { fromKg: 50, pricePerKg: 148 },
    nutrition: { calories: "352 kcal", protein: "7.0 g", carbs: "77 g", fat: "0.8 g" },
  },
  {
    slug: "classic-basmati-everyday",
    name: "Classic Basmati Everyday",
    tagline: "Daily-cook basmati",
    category: "Basmati",
    image: basmati,
    popular: false,
    rating: 4.6,
    description:
      "A shorter-aged basmati with a soft elongation and gentle aroma. Designed for everyday pulao, jeera rice and home meals.",
    origin: "Haryana, India",
    cookingTime: "12 min",
    shelfLife: "12 months",
    packs: [
      { label: "1 kg", kg: 1, price: 140 },
      { label: "5 kg", kg: 5, price: 670 },
      { label: "10 kg", kg: 10, price: 1290 },
    ],
    bulkPrice: { fromKg: 100, pricePerKg: 118 },
    nutrition: { calories: "354 kcal", protein: "7.3 g", carbs: "78 g", fat: "0.8 g" },
  },
  {
    slug: "organic-brown-rice",
    name: "Organic Brown Rice",
    tagline: "Whole-grain wholesome",
    category: "Brown",
    image: sona,
    popular: false,
    rating: 4.7,
    description:
      "Certified organic, single-polished brown rice with the bran intact. High fibre, low GI and a gentle nutty flavour.",
    origin: "Karnataka, India",
    cookingTime: "30 min",
    shelfLife: "9 months",
    packs: [
      { label: "1 kg", kg: 1, price: 130 },
      { label: "5 kg", kg: 5, price: 620 },
      { label: "10 kg", kg: 10, price: 1190 },
    ],
    bulkPrice: { fromKg: 50, pricePerKg: 105 },
    nutrition: { calories: "362 kcal", protein: "7.5 g", carbs: "76 g", fat: "2.7 g" },
  },
];

export const CATEGORIES = [
  "All",
  "Basmati",
  "Sona Masoori",
  "Matta",
  "Jasmine",
  "Brown",
] as const;

export const PACK_SIZES = ["All", "1 kg", "5 kg", "10 kg", "25 kg"] as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const WHATSAPP_NUMBER = "919876543210";
export const PHONE_DISPLAY = "+91 98765 43210";
export const BRAND_NAME = "Grainery";
export const BRAND_TAGLINE = "Premium rice, harvested with intent.";

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
