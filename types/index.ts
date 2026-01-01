import { z } from "zod";
import { insertProductsSchema } from "@/lib/validators";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  banner: string | null;
  price: string;
  rating: string;
  createdAt: Date;
};
