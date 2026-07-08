require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://novacart-topaz.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
const productRoute = require("./routes/product.js");
app.use("/products", productRoute);

const authRoute = require("./routes/auth.js");
app.use("/auth", authRoute);

const userRoute = require("./routes/cart.js");
app.use("/cart", userRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfull");
    app.listen(process.env.PORT, () => {
      console.log(`Backend server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
