import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const createBrand = async(req, res) => {
    const { name, brandValue } = req.body;

    try {
        const newBrand = await prisma.brands.create({
            data: {
                name,
                brandValue
            },
        })

        return res.status(200).send(newBrand);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Cannot create brand");
    }
}

const getAllBrands = async (req, res) => {
  try {
    const brands = await prisma.brands.findMany();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};

const getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await prisma.brands.findUnique({ where: { id } });
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brand" });
  }
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, brandValue } = req.body;

  try {
    const updatedBrand = await prisma.brands.update({
      where: { id },
      data: { name, brandValue },
    });
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: "Error updating brand" });
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.brands.delete({ where: { id } });
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting brand" });
  }
};

export {createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand};