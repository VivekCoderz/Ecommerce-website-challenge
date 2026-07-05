const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product.js");
const ProductData = require("./data/products.js");

const addProducts = async () => {   
    try{
        await Product.insertMany(ProductData);
        console.log("Products added successfully");
    }catch(err){
        console.log(err);
    }
}


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connection Successfull")
    addProducts();
}).catch((err) => {
    console.log(err)
})