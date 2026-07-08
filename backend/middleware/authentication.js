const jwt = require("jsonwebtoken");
const Errorhandler = require("../utils/ErrorHandler");
const ErrorMaker = require("../utils/ErrorMaker");

module.exports = Errorhandler(async (req,res,next) => {
    const token = req.cookies.token
    if(!token) throw new ErrorMaker(404,"please login first")
    try{
        const decoder = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoder)
        req.user = decoder
        next()
    }catch(err){
        console.log(err)
        throw new ErrorMaker(402,"Token is invalid")
    }
})