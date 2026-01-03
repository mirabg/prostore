"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { Product } from "@/types";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  })) as Product[];
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug: slug },
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  } as Product;
}
