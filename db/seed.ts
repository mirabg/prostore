import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import sampleData from "./sample-data";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({ data: sampleData.products });
    await prisma.user.createMany({ data: sampleData.users });
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
