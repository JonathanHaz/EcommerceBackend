const {User} = require('../models/users.model');
const {Discount} = require('../models/discounts.model');


exports.applyCouponToUser = async (req, res) => {
    try {
        const {couponCode } = req.body;

        // Find the user
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the coupon
        const coupon = await Discount.find({ couponCode });
        console.log(coupon);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        if (coupon.expirationDate < Date.now()) {
            return res.status(400).json({ message: "Coupon is not valid" });
        }

        // Apply coupon to user (for example, store coupon code in user's profile)
        user.appliedCoupon = couponCode;
        await user.save();

        res.status(200).json({ message: "Coupon applied successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDiscount = async (req, res) => {
    try {
        const { code, discountType, value, expirationDate } = req.body;

        // Check if the discount code already exists
        const existingDiscount = await Discount.findOne({ code });
        if (existingDiscount) {
            return res.status(400).json({ message: "Discount code already exists" });
        }

        // Create a new discount coupon
        const discount = new Discount({
            code,
            discountType,
            value,
            expirationDate
        });

        // Save the discount coupon to the database
        await discount.save();

        res.status(201).json({ message: "Discount coupon created successfully", discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
