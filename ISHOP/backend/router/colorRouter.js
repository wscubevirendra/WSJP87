const express = require("express");
const colorRouter = express.Router();
const colorController = require("../controller/colorController")


colorRouter.post("/create", colorController.create);
colorRouter.get("/:id?", colorController.getdata);
// colorRouter.patch("/status/:id", colorController.status);
// colorRouter.delete("/delete/:id", colorController.delete);
// colorRouter.put("/update/:id", fileupload({ createParentPath: true }), colorController.update);


module.exports = colorRouter;