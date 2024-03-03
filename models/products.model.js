const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, ref: "Users" },
        Id: {type: String,required: true , unique:true},
        Name: {type: String, required: true,  },
        Desc: {type: String, required: true},
        tags: [{ type: String, required: true }],
        Price: {type: String, required: true},
        imageUrl:  {type: String},
        publicId:  {type: String}
    }
)

const Product = mongoose.model("Products", productSchema);

module.exports = { Product }
