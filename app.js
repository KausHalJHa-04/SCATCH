const express = require("express");
const app = express();
const PORT = 3000;
const productRouter = require("./routes/productsRouter")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")  
const indexRouter = require("./routes/index")

require("dotenv").config();

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const expressSession = require("express-session");
const flash = require("connect-flash");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/owners/products", productRouter);
app.use("/users", usersRouter);

// app.listen(PORT)
app.listen(PORT, () => console.log("Server running on port " + PORT));