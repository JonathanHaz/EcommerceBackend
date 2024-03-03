const Payment = require('../models/payment.model');

exports.createPayment = async (req, res) => {
    try {
        const { userId, orderId, paymentMethod, amount, currency, paymentDate } = req.body;
        
        const payment = new Payment({
            userId,
            orderId,
            paymentMethod,
            amount,
            currency,
            paymentDate
        });

        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
