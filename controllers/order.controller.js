const {Order} = require('../models/order.model')
const {Product} = require('../models/products.model');
const {ShoppingCart} = require('../models/shoppingCart.model');

exports.createOrder = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        // Check if products is an array
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: "Products must be an array" });
        }

        let totalPrice = 0;
        for (const shoppingCartId of products) {
            const shoppingCart = await ShoppingCart.findById(shoppingCartId);
            if (!shoppingCart) {
                return res.status(404).json({ message: `ShoppingCart with ID ${shoppingCartId} not found` });
            }
            for (const productInfo of shoppingCart.products) {
                const product = await Product.findById(productInfo.productId);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${productInfo.productId} not found` });
                }
                totalPrice += parseFloat(product.productPrice) * productInfo.quantity;
            }
        }

        const order = new Order({
            userId,
            products,
            totalPrice,
            status,
            address,
            orderNumber,
            orderDate
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrderByUserId = async (req, res) => {
    try {
        const { userId, status, address, orderNumber, orderDate } = req.body;

        // Fetch all shopping carts of the user
        const shoppingCarts = await ShoppingCart.find({ userId });

        let totalPrice = 0;
        const products = [];
        for (const cart of shoppingCarts) {
            for (const productInfo of cart.products) {
                const product = await Product.findById(productInfo.productId);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${productInfo.productId} not found` });
                }
                products.push(productInfo.productId);
                totalPrice += parseFloat(product.productPrice) * productInfo.quantity;
            }
        }

        const order = new Order({
            userId,
            products,
            totalPrice,
            status,
            address,
            orderNumber,
            orderDate
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
