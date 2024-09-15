const express = require("express");
const doctorController = require("../controllers/doctorController");
const auth = require("../middleware/auth");

const doctorRouter = express.Router();

doctorRouter.get("/getalldoctors", doctorController.getalldoctors);

doctorRouter.get("/getnotdoctors", auth, doctorController.getnotdoctors);

doctorRouter.post("/applyfordoctor", auth, doctorController.applyfordoctor);

doctorRouter.get("/showalldate", auth, doctorController.showalldate);

doctorRouter.get("/showdoctordate", auth, doctorController.showdoctordate);
doctorRouter.get(
  "/getAllDoctorTimes",
  auth,
  doctorController.getAllDoctorTimes
);

doctorRouter.put("/deletedate1", auth, doctorController.deletedate1);

doctorRouter.put("/deletedate", auth, doctorController.deletedate);

doctorRouter.post("/adddate", auth, doctorController.adddate);

doctorRouter.put("/deletedoctor", auth, doctorController.deletedoctor);

doctorRouter.put("/acceptdoctor", auth, doctorController.acceptdoctor);

doctorRouter.put("/rejectdoctor", auth, doctorController.rejectdoctor);

module.exports = doctorRouter;
