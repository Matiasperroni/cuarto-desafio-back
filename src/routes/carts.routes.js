import { Router } from "express";
import CartManager from "../CartsManager.js";
const router = Router();

const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const products = req.body;
        await cartManager.addNewCart(products);
        res.send("New cart added!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cartID = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartID);
        res.send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartID = parseInt(req.params.cid);
        const prodID = parseInt(req.params.pid);
        await cartManager.addToCart(cartID, prodID);
        res.send("Product has been added to cart");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error, unable to obtain data");
    }
});

export default router;
