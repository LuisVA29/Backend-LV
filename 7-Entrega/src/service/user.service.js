const userModel = require('../models/user.models')
const { isValidPasswd, createHash } = require("../utils/encrypt");
const CartServiceManager = require("../service/cart.service")
const cartService = new CartServiceManager()

class UserManagerService {

    async checkUserAndPass(email, password) {
        try {
            const findUser = await userModel.findOne({ email }).lean()

            if (!findUser) throw Error("Usuario no registrado")

            if (!isValidPasswd(password, findUser.password)) throw Error("Contrasena incorrecta")
            
            delete findUser.password

            return findUser

        } catch (error) {
            throw Error(error)
        }  
    }

    async addUser(first_name, last_name, email, age, password) {
        try {   
            if (!first_name.trim()){
                throw new Error('Ingresa un Nombre correcto')
            }
    
            if (!last_name.trim()){
                throw new Error('Ingresa un Apellido correcto')
            }
    
            if (!email.trim()){
                throw new Error('Ingresa un email')
            }
            
            if (!password.trim()) {
                throw new Error('Ingresa una contrasena')
            }

            if (age <= 0  || typeof age != 'number') {
                throw new Error('Ingresa una edad correcta')
            }

            const pswHashed = await createHash(password)
    
            const user = {
                first_name,
                last_name,
                email,
                password: pswHashed,
                age,
                cart: await cartService.addCart()
            }

            let result = await userModel.create(user).then((res) => {
                return res
            }).catch((err) => {
                throw new Error(err)
            })
            return result
        } catch (error) {
            throw Error(error)
        }
    }

    async checkUserID(id) {
        try {
            const findUser = await userModel.findById(id).lean()
            return findUser

        } catch (error) {
            throw Error(error)
        }  
    }

    async checkUser(email) {
        try {
            const findUser = await userModel.findOne({ email }).lean()

            return findUser

        } catch (error) {
            throw Error(error)
        }  
    }

}

module.exports = UserManagerService