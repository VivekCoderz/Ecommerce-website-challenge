const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      minlength: 5,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
      minlength: 10,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Average rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Total reviews
    numReviews: {
      type: Number,
      default: 0,
    },

    // Main Image
    image: {
      type: String,
      required: true,
    },

    // Additional Images
    images: [
      {
        type: String,
      },
    ],

    // Category
    category: {
      type: String,
      required: true,
    },

    // Stock
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);