import express from "express";
import ProductManager from "./challenge3.js";

const app = express();
const productManager = new ProductManager("./productos.json");

app.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  try {
    let products = productManager.getProducts(); // Corregir el nombre del método
    if (!isNaN(limit)) {
      products = products.slice(0, limit);
    }
    res.json(products);
  } catch (error) {
    return res.send("Error al obtener los productos");
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productManager.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.send(`No se encontró el producto con id ${pid}`);
    }
  } catch (error) {
    console.log("Error al obtener el producto:", error);
    res.send("Error al obtener el producto");
  }
});

app.listen(8080, () => {
  console.log("Servidor en puerto http://localhost:8080");
});
