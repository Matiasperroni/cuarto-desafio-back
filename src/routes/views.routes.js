import { Router } from 'express';
import ProductManager from '../ProductsManager.js';
const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
    console.log("estas en /");
    const products = await productManager.getProducts()
    res.render("home", {products})
})




export default router;