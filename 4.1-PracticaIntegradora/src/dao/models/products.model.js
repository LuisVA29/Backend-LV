const mongoose = require("mongoose");

const collectionName = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: Array,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productsModel = mongoose.model(collectionName, productsSchema);
module.exports = productsModel;