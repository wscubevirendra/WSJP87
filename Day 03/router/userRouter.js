const express = require('express');
const UserRouter = express.Router();
const UserController = require("../controller/userController")


UserRouter.get("/get-data", UserController.getdata);
UserRouter.post("/create", UserController.create);
UserRouter.patch("/status/:id", UserController.status);
UserRouter.delete("/delete/:id", UserController.delete);
UserRouter.put("/update/:id", UserController.update);

module.exports = UserRouter;