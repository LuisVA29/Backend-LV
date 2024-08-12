import { Router } from "express"
import { authMdw } from "../middleware/auth.middleware.js"
import { addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl,
    buyCartCtrl } from "../controllers/carts.controller.js"

const router = Router()

router.post("/", authMdw(['PUBLIC']), addCartCtrl)

router.get("/:cid", authMdw(['PUBLIC']), getCartProductsCtrl)

router.post("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), addProductToCartCtrl)

router.delete("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), deleteProductCartCtrl)

router.put("/:cid/product/:pid", authMdw(['USER', 'ADMIN']), editProductQuantityCtrl)

router.post("/:cid/purchase", authMdw(['USER', 'ADMIN']), buyCartCtrl)

router.delete("/:cid", authMdw(['USER', 'ADMIN']), deleteAllCartProductsCtrl)

export default router