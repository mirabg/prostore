import { PrismaClient } from "@/lib/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Prisma } from "@/lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

let prismaClientSingleton: ReturnType<typeof createPrismaClient>;

function createPrismaClient() {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product: { price: Prisma.Decimal }) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product: { rating: Prisma.Decimal }) {
            return product.rating.toString();
          },
        },
      },
    },
  });
}

// Singleton pattern to prevent multiple Prisma instances in development
if (process.env.NODE_ENV === "production") {
  prismaClientSingleton = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prismaClientSingleton = global.prisma;
}

export const prisma = prismaClientSingleton;
