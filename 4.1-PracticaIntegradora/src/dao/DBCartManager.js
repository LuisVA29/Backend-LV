const cartsModel = require('./models/carts.model')

class DBCartManager {

    async getCarts() {
        try {
            const allCarts = await cartsModel.find({}).lean()
            return allCarts
        } catch (error) {
            throw Error(error)
        }
    }

    async addCart(){
        try {
            const cart = await cartsModel.create({products: []})
            .then((res) => {
                return `Se creo un nuevo carrito con id ${res._id}` 
            })
            .catch((error) => {
                throw Error(error)
            })

            return cart
        } catch (error) {
            throw Error(error)
        }
    }

    async getCartProducts(id){
        try {
           const findCart = await cartsModel.findById(id).lean()
           .then((res) => {
            return res.products
           })
           .catch((error) => {
            throw Error(error)
           })

           return findCart
        } catch (error) {
            throw Error(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const cart = await cartsModel.findById(idCart)
            const productExist = await cartsModel.find( {"_id": idCart, "products":{ 
                $elemMatch:{"id": idProduct}
             } } ).lean()
            console.log(productExist)

            if (!cart){
                throw Error("Cant find Cart ID")
            }

            if (!productExist.length){
                const productAdd = await cartsModel.findByIdAndUpdate( idCart,
                { $push: 
                    { products: { id: idProduct, quantity: 1 } } 
                })
                .then((res) => {
                    return `Se agrego el producto con id: ${idProduct} al carrito con id: ${idCart}` 
                })
                .catch((error) => {
                    throw Error(error)
                })
                return productAdd
            } else {
                const productAddQuant = await cartsModel.findOneAndUpdate({_id: idCart, 'products.id': idProduct}, {$inc : {
                    'products.$.quantity': 1
                }})
                .then((res) => {
                    return `Se aumento el producto con id: ${idProduct} al carrito con id: ${idCart}`
                })
                .catch((error) => {
                    throw Error(error)
                })
                return productAddQuant
            }
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = DBCartManager