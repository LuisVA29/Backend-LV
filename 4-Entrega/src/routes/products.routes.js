const { Router } = require("express");
const path = require("path");
const pathDB = path.join(__dirname, "../data/products.json");
const ProductManager = require("../managers/ProductManager.js");
const products = new ProductManager(pathDB);

const router = Router();

router.get("/", (req, res) => {
  products
    .getProducts()
    .then((result) => {
      if (req.query.limit) {
        res.status(200).json(result.slice(0, req.query.limit));
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.get("/:pid", (req, res) => {
  const id = Number(req.params.pid);
  products
    .getProductById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);

  products
    .addProduct(
      newProduct.title,
      newProduct.description,
      newProduct.price,
      newProduct.thumbnail,
      newProduct.code,
      newProduct.stock,
      newProduct.category,
      newProduct.status
    )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.put("/:pid", (req, res) => {
  const editData = req.body;
  const id = Number(req.params.pid);

  products
    .updateProduct(id, editData.field, editData.edit)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.delete("/:pid", (req, res) => {
  const id = Number(req.params.pid);

  products
    .deleteProduct(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

module.exports = router;
