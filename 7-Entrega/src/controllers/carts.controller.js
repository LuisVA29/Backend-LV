const CartServiceManager = require("../service/cart.service")
const cartService = new CartServiceManager()

const addCartCtrl = async(req, res) => {
    cartService.addCart().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}


const getCartProductsCtrl = async(req, res) => {
    const id = req.params.cid
    cartService.getCartProducts(id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const addProductToCartCtrl = async(req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    cartService.addProductToCart(idCart, idProduct).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const deleteProductCartCtrl = async(req,res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid

    cartService.deleteProductCart(idCart, idProduct).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const editProductQuantityCtrl = async(req,res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.query.quantity

    cartService.editProductQuantity(idCart, idProduct, quantity).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const deleteAllCartProductsCtrl = async(req,res) => {
    const idCart = req.params.cid

    cartService.deleteAllCartProducts(idCart).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}


module.exports = {
    addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl
}