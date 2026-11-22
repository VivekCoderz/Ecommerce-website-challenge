const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review.js");
const authentication = require("../middleware/authentication.js");

router.post("/add/:id", authentication, reviewController.postAddReview);

router.delete("/delete/:id", authentication, reviewController.postDeleteReview);

router.get("/:id", authentication, reviewController.getAllReview);

module.exports = router