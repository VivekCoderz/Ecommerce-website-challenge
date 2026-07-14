const Wishlist = require("../models/wishlist");
const Errorhandler = require("../utils/ErrorHandler");

module.exports.addWishlist = Errorhandler(async (req,res)=>{
     const userId = req.user.id;
  const productId = req.params.id;
  let wishlist = await Wishlist.findOne({ user: userId });
  console.log(wishlist)

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      items: [],
    });
  }

  const alreadyExists = wishlist.items.find(
    (item) => item.product.toString() === productId
  );

  if (!alreadyExists) {
    wishlist.items.push({
      product: productId,
    });
  }

  await wishlist.save();

  await wishlist.populate("items.product");

  res.status(200).json({
    message: "Added to wishlist",
    wishlist,
  });
})


module.exports.removeWishlist = Errorhandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return res.status(404).json({
      message: "Wishlist not found",
    });
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== productId
  );

  await wishlist.save();

  await wishlist.populate("items.product");

  res.status(200).json({
    message: "Removed from wishlist",
    wishlist,
  });
})

module.exports.getWishlist = Errorhandler(module.exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  let wishlist = await Wishlist.findOne({ user: userId }).populate(
    "items.product"
  );

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      items: [],
    });

    await wishlist.populate("items.product");
  }

  res.status(200).json({
    wishlist,
  });
})