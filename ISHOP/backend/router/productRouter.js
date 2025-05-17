const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controller/productController")
const fileupload = require("express-fileupload")


ProductRouter.post("/create", fileupload({ createParentPath: true }), productController.create);
ProductRouter.get("/:id?", productController.getdata);
ProductRouter.patch("/status/:id", productController.status);
ProductRouter.delete("/delete/:id", productController.delete);
ProductRouter.patch("/multiple-images/:id", fileupload({ createParentPath: true }), productController.multiple);



module.exports = ProductRouter;