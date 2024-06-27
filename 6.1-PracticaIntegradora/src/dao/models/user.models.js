const mongoose = require("mongoose");

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  age: Number,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: true
  },
  role: { 
    type: String,
    default: 'USER'
  },
});

userSchema.pre('findOne', function () {
  this.populate('cart.carts')
})

const userModel = mongoose.model(collection, userSchema);
module.exports = userModel;