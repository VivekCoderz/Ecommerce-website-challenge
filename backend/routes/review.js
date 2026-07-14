const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review.js");
const authentication = require("../middleware/authentication.js");

router.post("/add/:id", authentication, reviewController.postAddReview);

router.post("/delete/:id", authentication, reviewController.postDeleteReview);

router.get("/", authentication, reviewController.getAllReview);

module.exports = router