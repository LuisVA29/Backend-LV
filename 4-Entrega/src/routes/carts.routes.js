const { Router } = require("express");
const path = require("path");
const pathDB = path.join(__dirname, "../data/cart.json");
const CartManager = require("../managers/CartManager.js");
const cart = new CartManager(pathDB);

const router = Router();

router.post("/", (req, res) => {
  cart
    .addCart()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.get("/:cid", (req, res) => {
  const id = Number(req.params.cid);
  cart
    .getCartProducts(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.post("/:cid/product/:pid", (req, res) => {
  const idCart = Number(req.params.cid);
  const idProduct = Number(req.params.pid);
  cart
    .addProductToCart(idCart, idProduct)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

module.exports = router;
