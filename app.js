    const express = require('express');
    const cors = require('cors');
    const userRoute = require('./routes/users.routes')
    const productRoute = require('./routes/products.routes')
    const shopRoute = require('./routes/shoppingCart.routes')
    const orderRoute = require('./routes/order.routes')
    const paymentRoute = require('./routes/payment.routes')
    const discountRoute = require('./routes/discount.routes')


    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/v1/users", userRoute)
    app.use("/api/v1/products", productRoute)
    app.use("/api/v1/shop", shopRoute)
    app.use("/api/v1/orders", orderRoute)
    app.use("/api/v1/payments", paymentRoute)
    app.use("/api/v1/discounts", discountRoute)




    module.exports = {app}
