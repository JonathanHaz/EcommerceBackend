const mongoose = require("mongoose");


const shoppingCartSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, default: 1 }
  }],
  userId: { type: mongoose.Types.ObjectId, ref: "Users" },
  totalPrice: {type: Number, default: 0}
});


const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);
module.exports = {ShoppingCart};