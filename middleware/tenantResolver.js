import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tenantResolver = async (req, res, next) => {
  try {
    const tenantId = req.headers["x-tenant-id"]; // Extract tenant ID from headers

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID is required in headers" });
    }

    // Fetch tenant details from the main database
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    req.tenant = tenant; // Attach tenant info to the request
    next();
  } catch (error) {
    res.status(500).json({ message: "Error resolving tenant", error: error.message });
  }
};

export default tenantResolver;
