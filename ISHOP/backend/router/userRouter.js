const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/userController")


UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);


module.exports = UserRouter;