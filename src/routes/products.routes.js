import { Router } from "express";
import ProductManager from "../ProductsManager.js";

const router = Router();

const productManager = new ProductManager();
let products = [];

router.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    let products = await productManager.getProducts();
    if (limit > 0) {
        let newProd = products.slice(0, limit);
        res.send(newProd);
    } else {
        res.send(products);
    }
});

router.get("/:pid", async (req, res) => {
    let products = await productManager.getProducts();
    let productId = req.params.pid;
    let usuario = products.find((u) => u.id === parseInt(productId));
    if (!usuario) return res.send("Usuario no encontrado");
    res.send(usuario);
});

router.post("/", (req, res) => {
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
    } = req.body;
    productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status
    );
    res.send({ status: "success" });
});

router.put("/:pid", (req, res) => {
    const prodID = parseInt(req.params.pid);
    const prodToUpdate= req.body;
    const fieldToUpdate = Object.keys(prodToUpdate)
    const valueForUpdate = Object.values(prodToUpdate).toString()
    productManager.updateProduct(prodID, fieldToUpdate, valueForUpdate)
})

router.delete("/:pid",  (req, res) => {
    try {
        const prodID = parseInt(req.params.pid);
        productManager.deleteProduct(prodID);
        res.send("Eliminado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

export default router;
