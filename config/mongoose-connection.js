const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URL")}/scatch`)
  .then(function () {
    debug("connected");
    // console.log("connected")
  })
  .catch(function (err) {
    debug(err);
  });
 

  //$env:DEBUG="development:mongoose"; nodemon app.js
  
module.exports = mongoose.connection;
