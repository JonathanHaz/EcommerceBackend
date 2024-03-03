const { response } = require("express");
const { ShoppingCart } = require("../models/shoppingCart.model");
const { User } = require("../models/users.model");

const getShoppingCart = async (req, res) => {
  const shoppingCart = await ShoppingCart.find({});
  res.send(shoppingCart);
};
const getShoppingCartById = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findOne({userId: req.user.id}).populate("products.productId");
    res.send(shoppingCart);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const updateShoppingCart = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await ShoppingCart.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.send(update);
  } catch (error) {
    res.status(400).send("Error");
  }
};
const deletShoppingCart = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await ShoppingCart.findByIdAndDelete(id);
    return res.send("ID deleted");
  } catch (error) {
    res.status(400).send("Error");
  }
};
const newShoppingCart = async (req, res) => {
  const body = req.body;
  try {
    // console.log(req.user);
    body.userId = req.user.id;
    const shoppingCart = await new ShoppingCart(body);
    await shoppingCart.save();
    res.send({ message: "added", data: body });
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { ShopCartId: shoppingCart._id } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const addProduct = async (req, res) =>{
  const { shoppingCartId, productId } = req.body;
  try {
  
    const user = await User.findById(req.user.id);
    const shoppingCart = await ShoppingCart.findById(shoppingCartId);

    const existingProductIndex = shoppingCart.products.findIndex(product => product.productId.equals(productId));
    if (existingProductIndex !== -1) {
      shoppingCart.products[existingProductIndex].quantity += 1;
    } else {
      shoppingCart.products.push({ productId, quantity: 1 });
    }

    await shoppingCart.save();
    res.status(200).send("Product added to shopping cart successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Cannot add item, bad request");
  }
};

const removeProduct = async (req, res) => {
  const { shoppingCartId, productId } = req.body;
  try {
    // Find the user
    const user = await User.findById(req.user.id);
    const shoppingCart = await ShoppingCart.findById(shoppingCartId);
    const existingProduct = shoppingCart.products.find(product => product.productId.equals(productId));

    if (existingProduct) {
      // If quantity is greater than 1, decrement quantity by 1
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        // If quantity is 1, remove the product from the cart
        shoppingCart.products = shoppingCart.products.filter(product => !product.productId.equals(productId));
      }

      await shoppingCart.save();
      res.status(200).send("Product removed from shopping cart successfully");
    } else {
      res.status(404).send("Product not found in shopping cart");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("Cannot remove product, bad request");
  }
};

const calculateTotalPrice = async (req,res) => {
  const {id} = req.params

  try {
    const shoppingCart = await ShoppingCart.findById(id).populate("products.productId");
    let totalPrice = 0;
    shoppingCart.products.forEach(product => {
      totalPrice += product.quantity * product.productId.Price; 
    });
    console.log(totalPrice);

    shoppingCart.totalPrice = totalPrice;
    await shoppingCart.save();
    res.status(200).send({
      data: totalPrice,
    })
 
  } catch (error) {
    console.error(error);
  }
};



module.exports = {
  newShoppingCart,
  deletShoppingCart,
  updateShoppingCart,
  getShoppingCart,
  getShoppingCartById,
  addProduct,
  removeProduct,
  calculateTotalPrice
};