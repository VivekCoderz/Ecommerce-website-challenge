const express = require("express")
mongoose = require("mongoose")
require('dotenv').config()
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())

// Routes
const productRoute = require("./routes/product.js")
app.use("/products", productRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connection Successfull")
    app.listen(process.env.PORT, () => {
        console.log(`Backend server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err)
})