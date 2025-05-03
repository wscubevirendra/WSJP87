const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const UserRouter = require('./router/userRouter')
const server = express();

server.use(express.json())
server.use(cors())
server.use("/user", UserRouter)

mongoose.connect("mongodb://localhost:27017/", { dbName: "WSJP87" }).then(
    () => {
        server.listen(5000, () => {
            console.log("Server is running on port 5000")
        })
        console.log("Connected to MongoDB")
    }
).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
})


