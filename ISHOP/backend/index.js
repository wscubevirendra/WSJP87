require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRouter = require("./router/categoryRouter");
const colorRouter = require("./router/colorRouter");
const ProductRouter = require("./router/productRouter");
const AdminRouter = require("./router/adminRouter");
const UserRouter = require('./router/userRouter');
const CartRouter = require('./router/cartRouter');
const server = express();
server.use(cors());
server.use(express.json());
server.use("/category", categoryRouter);
server.use("/color", colorRouter);
server.use("/product", ProductRouter)
server.use("/admin", AdminRouter)
server.use("/user", UserRouter)
server.use("/cart", CartRouter)
server.use(express.static("./public"));


mongoose.connect(process.env.MONGODB, { dbName: "WSJP87" }).then(
    () => {
        server.listen(5000, () => {
            console.log("Server is running on port 5000");
        })
        console.log("Connected to MongoDB");
    }
).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});


