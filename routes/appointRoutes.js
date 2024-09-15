const express = require("express");
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");

const appointRouter = express.Router();
const multer = require("multer");
const path = require("path");

//multer cofig
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imageteeth/");
  },
  filename: function (req, file, cb) {
    // const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

appointRouter.get(
  "/getallappointments",
  auth,
  appointmentController.getallappointments
);

appointRouter.post(
  "/bookappointment",
  upload,
  auth,
  appointmentController.bookappointment
);
appointRouter.put("/Accept", auth, appointmentController.Accept);
appointRouter.put("/Reject", auth, appointmentController.Reject);

module.exports = appointRouter;
