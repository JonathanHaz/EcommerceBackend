const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        username: {type: String, required: true, unique:true },
        email: {type: String, required: true, unique:true},
        password: {type: String, required: true},
        address: {
            street: { type: String },
            city: { type: String },
            postalCode: { type: String },
            country: { type: String }
        },
        isAdmin: { type: Boolean, default: false },
        ShopCartId: {type: mongoose.Types.ObjectId, ref: "ShoppingCart" },
        imageUrl:  {type: String, default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"},
        publicId:  {type: String}

    }
)

const User = mongoose.model("Users", userSchema);

module.exports = { User }
