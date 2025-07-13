import { PrismaClient } from "@prisma/client";
import { products } from "../constants/products.js";

const prisma = new PrismaClient();

const createAllProducts = async (req, res) => {
  try {
    const brandsInDb = await prisma.brands.findMany({
      select: { id: true },
    });
    const validBrandIds = new Set(brandsInDb.map((b) => b.id));

    const invalidProducts = products.filter(
      (p) => !validBrandIds.has(p.brandId)
    );
    if (invalidProducts.length > 0) {
      return res.status(400).json({
        message: "One or more products contain invalid brandId(s).",
        invalidBrandIds: [...new Set(invalidProducts.map((p) => p.brandId))],
      });
    }

    const cleanedData = products.map(
      ({ id, CartItems, Brands, ...rest }) => rest
    );

    const result = await prisma.product.createMany({
      data: cleanedData,
      skipDuplicates: true,
    });

    return res.status(200).json({
      message: `${result.count} products added successfully.`,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Cannot fetch products");
  }
};

const getUniqueProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(501).send("Product not found");
    }

    return res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching product");
  }
};

export { createAllProducts, getAllProducts, getUniqueProduct };
