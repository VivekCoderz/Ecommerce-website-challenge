const express = require("express")
const router = express.Router()
const wishlistController = require("../controllers/wishlist.js");
const authentication = require("../middleware/authentication.js");

router.post("/add/:id", authentication, wishlistController.addWishlist);

router.post("/remove/:id", authentication, wishlistController.removeWishlist);

router.get("/", authentication, wishlistController.getWishlist);

module.exports = router