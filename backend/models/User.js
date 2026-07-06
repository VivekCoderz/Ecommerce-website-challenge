const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        require : true,
        minLength : 5,
        maxLength  : 100
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true
    }
},{timestamps:true})

module.exports = mongoose.model("user",UserSchema)
