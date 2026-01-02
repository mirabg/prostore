import { PrismaClient } from "@/lib/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("PrismaClient imported:", typeof PrismaClient, PrismaClient);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

declare global {
  var prismaGlobal: PrismaClient | undefined;
  var poolGlobal: Pool | undefined;
}

function createPrismaClient() {
  console.log("Creating Prisma client...");
  const pool = globalThis.poolGlobal ?? new Pool({ connectionString });
  if (!globalThis.poolGlobal) {
    globalThis.poolGlobal = pool;
  }
  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });

  console.log("Prisma client created. Type:", typeof client);
  console.log("Has user property:", "user" in client, typeof client.user);

  // Explicitly connect to ensure the client is ready
  client.$connect().catch((err) => {
    console.error("Failed to connect Prisma client:", err);
  });

  return client;
}

// Singleton pattern to prevent multiple Prisma instances in development
export const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
