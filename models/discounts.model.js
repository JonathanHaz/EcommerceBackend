const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true },
    active: { type: Boolean, default: true },
    expirationDate: { type: Date, required: true }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = {Discount};
