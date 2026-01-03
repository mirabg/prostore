import { z } from "zod";
import {
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
} from "@/lib/validators";
import { Prisma } from "@/lib/generated/prisma/client";

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

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = Omit<
  z.infer<typeof insertOrderItemSchema>,
  "price" | "qty"
> & {
  price: Prisma.Decimal;
  qty: number;
  orderId: string;
};
export type Order = Omit<
  z.infer<typeof insertOrderSchema>,
  "itemsPrice" | "shippingPrice" | "taxPrice" | "totalPrice"
> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  itemsPrice: Prisma.Decimal;
  shippingPrice: Prisma.Decimal;
  taxPrice: Prisma.Decimal;
  totalPrice: Prisma.Decimal;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;
