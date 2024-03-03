const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "Users" },
        orderId: { type: mongoose.Types.ObjectId, ref: "Orders" },
        paymentMethod: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        paymentDate: { type: Date, default: Date.now },
    
    }
)

const Payment = mongoose.model("Payments", paymentSchema);

module.exports = { Payment }