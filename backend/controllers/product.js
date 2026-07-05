const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const  Errorhandler = require("../utils/ErrorHandler");
const  ErrorMaker = require("../utils/ErrorMaker");

module.exports.getAllProducts = Errorhandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        success: true,
        products
    })
})

module.exports.getProductById = Errorhandler(async (req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ErrorMaker(400,"Invalid Product Id")
    }
    const product = await Product.findById(id)
    console.log(product)
    if(!product) throw new ErrorMaker(400,"Product is not found")
    res.status(200).json({
        success: true,
        product
    })
})
