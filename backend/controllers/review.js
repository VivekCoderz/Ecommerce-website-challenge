const { default: mongoose } = require("mongoose");
const Review = require("../models/Review");
const Errorhandler = require("../utils/ErrorHandler");
const ErrorMaker = require("../utils/ErrorMaker");

module.exports.postAddReview = Errorhandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ErrorMaker(400, "Invalid Review Id");
  const { rating, comment } = req.body;
  const alreadyReviewed = await Review.findOne({
    user: userId,
    product: productId,
  });

  if (alreadyReviewed) {
    throw new ErrorMaker(400, "You have already reviewed this product");
  }
  if (!rating || !comment) {
    throw new ErrorMaker(400, "Rating and comment are required");
  }

  if (rating < 1 || rating > 5) {
    throw new ErrorMaker(400, "Rating must be between 1 and 5");
  }
  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment,
  });
  res.status(201).json({
    message: "Review Added Successfully",
    review: review,
  });
});

module.exports.postDeleteReview = Errorhandler(async (req, res) => {
  const reviewId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(reviewId))
    throw new ErrorMaker(400, "Invalid Review Id");
  const review = await Review.findByIdAndDelete(reviewId);

  if (!review) {
    throw new ErrorMaker(404, "Review not found");
  }

  res.status(200).json({
    message: "Review Deleted Successfully",
  });
});

module.exports.getAllReview = Errorhandler(async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ErrorMaker(400, "Invalid Product Id");
  const review = await Review.find({ product: productId })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });
  res.status(200).json({ review: review });
});
