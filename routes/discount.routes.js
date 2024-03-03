const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware')
const discountController = require('../controllers/discount.controller');

// Route for creating a new discount
router.post('/', discountController.createDiscount);
router.post('/apply', auth ,discountController.applyCouponToUser);


module.exports = router;
