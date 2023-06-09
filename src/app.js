import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import ProductManager from "./ProductsManager.js";

//instance of server
const app = express();

//static files
app.use(express.static(__dirname + "/public"));

//setting handlerbars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//server http
const serverHttp = app.listen(8080, () => {
    console.log("Listening port 8080");
});

const productManager = new ProductManager();
app.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});
//websocket
const io = new Server(serverHttp);
//function to get products 
const sendProductList = async () => {
    const products = await productManager.getProducts();
    return products;
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    const products = await sendProductList();
    socket.emit("sendProducts", products);
});
