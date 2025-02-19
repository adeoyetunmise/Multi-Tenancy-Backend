import express from "express";
import { PrismaClient } from "@prisma/client";
import tenantResolver from "../middleware/tenantResolver.js";

const router = express.Router();
const prisma = new PrismaClient();

// 🚀 **Create a new tenant**
router.post("/", async (req, res) => {
  try {
    const { name, databaseURI } = req.body;
    if (!name || !databaseURI) {
      return res.status(400).json({ message: "Name and Database URI are required" });
    }

    const newTenant = await prisma.tenant.create({
      data: { name, databaseURI },
    });

    res.status(201).json({ message: "Tenant created successfully", tenant: newTenant });
  } catch (error) {
    res.status(500).json({ message: "Error creating tenant", error: error.message });
  }
});

// 🚀 **Fetch all tenants**
router.get("/", async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tenants", error: error.message });
  }
});

// 🚀 **Fetch Tenant-Specific Data**
router.get("/data", tenantResolver, async (req, res) => {
    try {
      res.status(200).json({ message: "Tenant data fetched", tenant: req.tenant });
    } catch (error) {
      res.status(500).json({ message: "Error fetching tenant data", error: error.message });
    }
  });

// 🚀 **Update a tenant**
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, databaseURI } = req.body;

    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: { name, databaseURI },
    });

    res.status(200).json({ message: "Tenant updated successfully", tenant: updatedTenant });
  } catch (error) {
    res.status(500).json({ message: "Error updating tenant", error: error.message });
  }
});

// 🚀 **Delete a tenant**
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tenant.delete({ where: { id } });
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tenant", error: error.message });
  }
});

export default router;
