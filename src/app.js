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
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});
//websocket
const io = new Server(serverHttp);
// const sendProductList = async() =>  {
//     const products = await productManager.getProducts();
    
//     return products
// }

// io.on("message", data=>console.log(data))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection",  (socket) => {
    console.log("Nuevo cliente conectado");
    socket.on("algo", (data) => {
        console.log(data);
    })
    socket.emit("message", "mensajeeeeeeeeeee")
//     io.emit("mensaje", "hola sisi")
//     let hola = {title: "hola"}
// socket.emit("productsUpdated", hola)
    // let products = await sendProductList()
    // socket.emit("productsUpdated", products)
});
// io.emit("message", "este mensajito")
// io.on("algo", (data) => {
//     console.log(data);
// })
// io.emit("message", "mensajito")

io.emit("hola", "hola")