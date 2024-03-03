const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "ShoppingCart",
        required: true
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    orderNumber: { type: String, required: true, unique: true },
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order};
