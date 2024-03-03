const { uploadToCloudinary } = require("../cloudinary/media.cloudinary")
const { Product } = require("../models/products.model")

const getProduct = async(req,res)=>{
    const query =  req.query
    const product = await Product.find({...query})
    res.send(product)
}

const createProduct = async(req,res)=>{
    const body = req.body
    try{
        body.userId = req.user.id
        const newProduct = new Product(body)
        newProduct.Id = newProduct._id
        await newProduct.save()
        res.send(body)
    }
    catch{res.status(400).send("Cant create Product")}
}

const editProduct = async(req , res) =>{
    const body = req.body
    const {id} = req.params
    await Product.findByIdAndUpdate(id,body , {new:true})
    res.send(body);
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.send("Porduct has been deleted")

}

const addImageProduct = async(req,res)=>{
    try{
        const data= await uploadToCloudinary(req.file.path, "product-images")

    const savedImg = await Product.updateOne(
        {_id: req.params.id},
        {
            $set: {
                imageUrl: data.url,
                publicId: data.public_id
            },
        }
    );
    res.status(200).send("image uploaded!")
    }
    catch{
        res.status(400).send("Cannot upload image !")
    }
   
}

module.exports = {getProduct, createProduct, editProduct, deleteProduct, addImageProduct}