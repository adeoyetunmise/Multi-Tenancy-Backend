import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTenant = async () => {
  try {
    const newTenant = await prisma.tenant.create({
      data: {
        name: "Cozy Comfort Rentals",
        databaseURI: "mongodb+srv://username:password@cluster.mongodb.net/tenant-db",
      },
    });

    console.log("Tenant created:", newTenant);
  } catch (error) {
    console.error("Error creating tenant:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createTenant();
