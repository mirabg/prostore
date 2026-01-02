import { z } from "zod";
import { insertProductsSchema } from "@/lib/validators";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
  }
}

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
  numReviews: number;
  createdAt: Date;
};
