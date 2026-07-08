const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const ErrorMaker = require("../utils/ErrorMaker.js");
const bcrypt = require("bcrypt");

module.exports.postRegister = ErrorHandler(async (req, res) => {
  const { fullName, email, password, ConfirmPassword } = req.body;
  let requireField = ["fullName", "email", "password", "ConfirmPassword"];
  let havingField = Object.keys(req.body);
  let missingField = requireField.filter((ele) => !havingField.includes(ele));
  if (missingField.length > 0)
    throw new ErrorMaker(
      400,
      `please porvide ${missingField.join(",")} for register`,
    );
  if (password != ConfirmPassword)
    throw new ErrorMaker(400, "Password and confirm password must be same");
  if (password.length < 8)
    throw new ErrorMaker(400, "Password have at least 8 character");
  const existUser = await User.findOne({ email });
  if (existUser) throw new ErrorMaker(400, "email already Exist");
  const hashpassword = await bcrypt.hash(password, 10);
  await User.create({ fullName, password: hashpassword, email });
  res.status(200).json({ message: "Registration done successfully" });
});

module.exports.postLogin = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  let requireField = ["email", "password"];
  let havingField = Object.keys(req.body);
  let missingField = requireField.filter((ele) => !havingField.includes(ele));
  if (missingField.length > 0)
    throw new ErrorMaker(
      400,
      `please porvide ${missingField.join(",")} for login`,
    );
  const existUser = await User.findOne({ email });
  if (!existUser)
    throw new ErrorMaker(400, "email not registed ,please register first");
  const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
  if (!isPasswordCorrect) throw new ErrorMaker(400, "password is incorrect");
  const token = await jwt.sign(
    { id: existUser._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,
    // sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Login done successfully", user: existUser });
});

module.exports.postLogout = ErrorHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
});


module.exports.getme = ErrorHandler(async (req,res)=>{
    console.log(req.user)
    const user = await User.findOne({_id : req.user.id})
    res.status(200).json({user})
})