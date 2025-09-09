const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const userModel = require("../models/user-model");



module.exports.registerUser = async function (req, res) { 
    try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email:email });
    if(user) return res.status(401).send("You already have an account, please login")


    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password:hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.send("User Created Successfully")
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
 }

module.exports.loginUser = async function (req, res) {
  let {email, password} = req.body;
  // try {
    let user = await userModel.findOne({ email: email });
    if(!user) return res.send("Email or password is incorrect");

    bcrypt.compare(password, user.password, function (err, result) {
      if(result){
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("User Logged In Successfully")
      }else{
        res.send("Email or password is incorrect");
      }
        
    });
// }
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
};
