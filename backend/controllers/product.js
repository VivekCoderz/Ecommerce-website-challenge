const Product = require("../models/Product");
const  Errorhandler = require("../utils/ErrorHandler");

module.exports.getAllProducts = Errorhandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        success: true,
        products
    })
})
