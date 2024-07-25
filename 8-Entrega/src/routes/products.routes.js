import { Router } from "express"
import { authMdw } from "../middleware/auth.middleware.js"
import { getProductsCtrl,
    getProductsByIdCtrl,
    addProductCtrl,
    updateProductCtrl,
    deleteProductCtrl } from "../controllers/products.controller.js"

const productsRoutes = Router()

productsRoutes.get("/", authMdw(['PUBLIC']), getProductsCtrl)

productsRoutes.get("/:pid", authMdw(['PUBLIC']), getProductsByIdCtrl)

productsRoutes.post("/", authMdw(['ADMIN']), addProductCtrl)

productsRoutes.put("/:pid", authMdw(['ADMIN']), updateProductCtrl)

productsRoutes.delete("/:pid", authMdw(['ADMIN']), deleteProductCtrl)

export default productsRoutes