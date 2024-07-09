const { Router } = require("express")
const { authMdw } = require("../middleware/auth.middleware")
const {
    addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl
} = require("../controllers/carts.controller")

const router = Router()

router.post("/", authMdw(['PUBLIC']), addCartCtrl)

router.get("/:cid", authMdw(['PUBLIC']), getCartProductsCtrl)

router.post("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), addProductToCartCtrl)

router.delete("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), deleteProductCartCtrl)

router.put("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), editProductQuantityCtrl)

router.delete("/:cid", authMdw(['USER', 'ADMIN']), deleteAllCartProductsCtrl)

module.exports = router