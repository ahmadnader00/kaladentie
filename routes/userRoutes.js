const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const multer = require("multer");
const path = require("path");

//multer cofig
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    // const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

userRouter.get("/getuser/:id", auth, userController.getuser);

userRouter.get("/getallusers", auth, userController.getallusers);

userRouter.post("/login", userController.login);

userRouter.post("/register", upload, userController.register);

userRouter.put("/updateprofile", auth, userController.updateprofile);

userRouter.delete("/deleteuser", auth, userController.deleteuser);

module.exports = userRouter;
