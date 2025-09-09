const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    let err = req.flash("error");
    res.render("index", { err });
});

router.get("/shop", isloggedin, async function (req, res) {
    let products = await productModel.find();
    res.render("shop", { products });
});

router.get("/logout", isloggedin, async function (req, res) {
    let products = await productModel.find();
    res.render("shop", { products });
});

module.exports = router