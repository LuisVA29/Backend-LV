const { Router } = require("express")
const { authMdw, authMdwFront } = require("../middleware/auth.middleware")
const {
    getProductsCtrl,
    getProductsByIdCtrl,
    addProductCtrl,
    updateProductCtrl,
    deleteProductCtrl
} = require("../controllers/products.controller")

const router = Router()

router.get("/", authMdw(['PUBLIC']), getProductsCtrl)

router.get("/:pid", authMdw(['PUBLIC']), getProductsByIdCtrl)

router.post("/", authMdw(['ADMIN']), addProductCtrl)

router.put("/:pid", authMdw(['ADMIN']), updateProductCtrl)

router.delete("/:pid", authMdw(['ADMIN']), deleteProductCtrl)

module.exports = router