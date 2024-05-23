const mongoose = require("mongoose");

const collectionName = "carts";

const cartsSchema = new mongoose.Schema({
    products: [
      {
        id:String,
        quantity:Number
      },
    ],
});

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;