import express from "express"
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/brands.controllers.js";

const brandRouter = express.Router()

brandRouter.post('/create', createBrand);
brandRouter.get('/', getAllBrands);
brandRouter.get('/:id', getBrandById);
brandRouter.put('/:id', updateBrand);
brandRouter.delete('/:id', deleteBrand);

export default brandRouter;