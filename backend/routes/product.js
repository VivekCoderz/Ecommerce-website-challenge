const express = require("express");
const productController = require("../controllers/product.js");

const router = express.Router();

router.get("/",productController.getAllProducts);

module.exports = router;