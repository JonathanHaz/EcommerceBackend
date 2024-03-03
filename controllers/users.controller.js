const { User } = require('../models/users.model')
const bcrypt = require("bcryptjs")
const { generateToken , verifyToken} = require('../utils/jwt')
const { ShoppingCart } = require('../models/shoppingCart.model')

const getUsers = async(req,res)=>{
    const query =  req.query
    const user = await User.find({...query})
    res.send(user)
}

const getUser =  async(req,res)=>{
    try{
        const link = await User.findById(req.user.id)
        res.send(link)
    }
    catch(err){
        res.status(400).send("cannot find")
    }
}

const Register = async (req, res) => {
    try {
        const body = req.body;
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
        const user = new User(body);
        user.id = user._id;

        const shoppingCart = new ShoppingCart({ userId: user.id });
        await shoppingCart.save();
        user.ShopCartId = shoppingCart._id;

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Error");
    }
};


const Login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = generateToken({id: user._id ,email: user.email})
        return res.send({user, token});
    } 
    return res.status(401).send("Email or password are incorrect");
    };
    return res.status(401).send("Email or password are incorrect");
    }
    catch(err){
        res.status(400).send("Cannot Log in")
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Error updating user");
    }
}

const addImageUser = async(req,res)=>{
    try{
        const data= await uploadToCloudinary(req.file.path, "profile-images")

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

module.exports = { getUsers, getUser, Register, Login, deleteUser, updateUser, addImageUser };


