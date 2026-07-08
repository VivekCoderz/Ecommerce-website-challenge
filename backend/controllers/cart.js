const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose")
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorMaker = require("../utils/ErrorMaker");

module.exports.getCart = ErrorHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  res.status(200).json({
    success: true,
    cart: cart ? cart.items : [],
  });
});



module.exports.postAddToCart = ErrorHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  
  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ErrorMaker(400, "Invalid Product Id");
  console.log(req.user)

  const product = await Product.findById(productId);

  if (!product)
    throw new ErrorMaker(404, "Product not found");

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [],
    });
  }

  const existingProduct = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  await cart.populate("items.product");

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart: cart.items,
  });
});

module.exports.postUpdateQuantity = ErrorHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ErrorMaker(400, "Invalid Product Id");

  if (quantity < 1)
    throw new ErrorMaker(400, "Quantity must be greater than 0");

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    throw new ErrorMaker(404, "Cart not found");

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item)
    throw new ErrorMaker(404, "Product not found in cart");

  item.quantity = quantity;

  await cart.save();

  await cart.populate("items.product");

  res.status(200).json({
    success: true,
    message: "Quantity updated",
    cart: cart.items,
  });
});

module.exports.postRemoveItem = ErrorHandler(async (req, res) => {
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ErrorMaker(400, "Invalid Product Id");

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    throw new ErrorMaker(404, "Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  await cart.populate("items.product");

  res.status(200).json({
    success: true,
    message: "Item removed",
    cart: cart.items,
  });
});

module.exports.postClearCart = ErrorHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    throw new ErrorMaker(404, "Cart not found");

  cart.items = [];

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    cart: [],
  });
});