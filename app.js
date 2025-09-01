const express = require("express");
const app = express();
const PORT = 3000;
const productRouter = require("./routes/productsRouter")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")  

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.send("hey babu")
});
app.use("/owners", ownersRouter)
app.use("/products", productRouter)
app.use("/users", usersRouter)

app.listen(PORT)
// app.listen(PORT, () => console.log("Server running on port " + PORT));