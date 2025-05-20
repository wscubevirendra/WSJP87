const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRouter = require("./router/categoryRouter");
const colorRouter = require("./router/colorRouter");
const ProductRouter = require("./router/productRouter");
const AdminRouter = require("./router/adminRouter");
const server = express();
server.use(cors());
server.use(express.json());
server.use("/category", categoryRouter);
server.use("/color", colorRouter);
server.use("/product", ProductRouter)
server.use("/admin", AdminRouter)
server.use(express.static("./public"));


mongoose.connect("mongodb://localhost:27017/", { dbName: "WSJP87" }).then(
    () => {
        server.listen(5000, () => {
            console.log("Server is running on port 5000");
        })
        console.log("Connected to MongoDB");
    }
).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});


