const { Router } = require("express");
const path = require("path");
const pathDB = path.join(__dirname, "../data/products.json");
const styles = path.join(`${__dirname}/../public/styles/styles.css`);
const ProductManager = require("../managers/ProductManager.js");
const products = new ProductManager(pathDB);

const router = Router();

router.get("/", (req, res) => {
  products
    .getProducts()
    .then((result) => {
      res.render("index", {
        title: "PreEntrega4-Backend",
        products: result,
        style: "styles.css",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.get("/realtimeproducts", (req, res) => {
  products
    .getProducts()
    .then((result) => {
      res.render("realtimeproducts", {
        title: "Productos en tiempo real",
        products: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

module.exports = router;
