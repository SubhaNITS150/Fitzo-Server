import express from "express"
import { createAllProducts, getAllProducts } from "../controllers/products.controllers.js";

const productRouter = express.Router();

productRouter.post('/all', createAllProducts);
productRouter.get('/', getAllProducts);

export default productRouter;