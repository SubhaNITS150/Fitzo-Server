import express from "express"
import { createAllProducts, getAllProducts, getUniqueProduct } from "../controllers/products.controllers.js";

const productRouter = express.Router();

productRouter.post('/all', createAllProducts);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getUniqueProduct)

export default productRouter;