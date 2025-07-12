import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js";
import brandRouter from "./routes/brands.routes.js";
import productRouter from "./routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/api/user', userRouter);
app.use('/api/brand', brandRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})