const Doctor = require("../models/doctorModel");
const checkstd = require("../models/checkstd");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");
const stdtime = require("../models/stdtime");

const getalldoctors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Doctor.find({ isDoctor: true }).populate("userId");
    } else {
      docs = await Doctor.find({ isDoctor: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get doctors");
  }
};

/* const showalldate = async (req, res) => {
  try {
    const notifs = await stdtime.find({ userId: req.locals });
    console.log(notifs);
    return res.send(notifs);
  } catch (error) {
    res.status(500).send("Unable to get all date");
  }
}; */
const getAllDoctorTimes = async (req, res) => {
  try {
    const doctorTimes = await stdtime.find().populate("userId");
    res.json(doctorTimes);
  } catch (err) {
    res.json({ message: err });
  }
};
const showalldate = async (req, res) => {
  try {
    const doc = await stdtime.find({ userId: req.locals , state: true });

    return res.send(doc);
  } catch (error) {
    res.status(500).send("Unable to get Date");
  }
};
const showdoctordate = async (req, res) => {
  try {
    const doc = await stdtime.find({ userId: req.query.doctorId, state: true });

    return res.send(doc);
  } catch (error) {
    res.status(500).send("Unable to get date");
  }
};

const adddate = async (req, res) => {
  try {
    // Check if the user has already added the same date and time
    const existingDatetime = await stdtime.findOne({
      userId: req.locals,
      time: req.body.formDetails.time,
      date: req.body.formDetails.date,
    });

    if (existingDatetime) {
      return res.status(400).send("You have already added this date and time.");
    }
    const datetime = await stdtime({
      userId: req.locals,
      time: req.body.formDetails.time,
      date: req.body.formDetails.date,
    });
    const result = await datetime.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to add date");
  }
};

const deletedate = async (req, res) => {
  try {
    const removedate = await stdtime.findOneAndDelete({
      _id: req.body.userId,
    });
    return res.send("date deleted successfully");
  } catch (error) {
    console.log("error", error);
    /*   if (req.body.getdate.state === true) {
    res.status(500).send("you can't delete Appointment booked");
    }
    else
    { */
    res.status(500).send("Unable to delete doctor");
  }
};
const deletedate1 = async (req, res) => {
  try {
    if (req.body.state === true) {
      const removedate = await stdtime.findOneAndDelete({
        _id: req.body.doctorTimeId,
      });
      return res.send("date deleted successfully");
    } else {
      res.status(500).send("you can't delete Appointment booked");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete doctor");
  }
};

const getnotdoctors = async (req, res) => {
  try {
    const docs = await Doctor.find({ isDoctor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non doctors");
  }
};

const applyfordoctor = async (req, res) => {
  try {
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }
    const alreadyFound1 = await checkstd.findOneAndUpdate(
      {
        studentid: req.body.formDetails.studentid,
        year: req.body.formDetails.year,
        state: true,
      },
      { state: "false" }
    );
    /* console.log(alreadyFound1) */
    if (!alreadyFound1) {
      return res.status(400).send("the student id is not exist");
    }
    /* const alreadyFound2 = await checkstd.findOne({ year: req.body.formDetails.year });
    
    if (!alreadyFound2) {
      return res.status(400).send("the student id is not exist");
    } */
    const doctor = Doctor({ ...req.body.formDetails, userId: req.locals });
    const result = await doctor.save();
    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptdoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { isDoctor: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectdoctor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletedoctor = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isDoctor: false,
    });
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.deleteMany({
      doctorId: req.body.userId,
    });
    const removedate = await stdtime.deleteMany({
      userId: req.body.userId,
    });

    return res.send("Doctor deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete doctor");
  }
};

module.exports = {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
  adddate,
  showalldate,
  deletedate,
  showdoctordate,
  getAllDoctorTimes,
  deletedate1,
};
