const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controllers');

// Route for creating a new payment
router.post('/payments', paymentController.createPayment);

module.exports = router;
