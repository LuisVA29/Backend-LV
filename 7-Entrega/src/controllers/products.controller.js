const url = require("url");
const ProductServiceManager = require("../service/product.service");
const productService = new ProductServiceManager();

const getProductsCtrl = async (req, res) => {
  const { page = 1, limit = 6, sort } = req.query;

  let query = {};

  if (req.query.status) {
    query = { status: req.query.status };
  }

  if (req.query.category) {
    //convierte la primera letra en mayuscula, TODO checar por que lo hice? arregalar
    query = {
      category:
        req.query.category.charAt(0).toUpperCase() +
        req.query.category.slice(1),
    };
  }

  const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);

  productService
    .getProducts(page, limit, sort, query, url)
    .then((result) => {
      res.status(200).json({ status: "success", ...result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: "error", message: err.message });
    });
};

const getProductsByIdCtrl = async (req, res) => {
  const id = req.params.pid;
  productService
    .getProductById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const addProductCtrl = async (req, res) => {
  const newProduct = req.body;
  const io = req.app.get("io");

  productService
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
      io.emit("product created", result);
      return res
        .status(200)
        .json(`Se subio correctamente el articulo con id: ${result._id}`);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const updateProductCtrl = async (req, res) => {
  const editData = req.body;
  const id = req.params.pid;

  productService
    .updateProduct(id, editData.field, editData.edit)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const deleteProductCtrl = async (req, res) => {
  const id = req.params.pid;
  const io = req.app.get("io");

  productService
    .deleteProduct(id)
    .then((result) => {
      io.emit("product deleted", id);
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

module.exports = {
  getProductsCtrl,
  getProductsByIdCtrl,
  addProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
};
