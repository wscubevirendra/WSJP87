const express = require("express");
const AdminRouter = express.Router();
const AdminController = require("../controller/adminController")


AdminRouter.post("/login", AdminController.login);


module.exports = AdminRouter;