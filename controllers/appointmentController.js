const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const stdtime = require("../models/stdtime");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const getallappointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  if (req.locals === req.body.doctorId) {
    return res.status(400).send("Unable to book appointments");
  }
  try {
    // Check if the user has already booked an appointment at the same date and time
    /* const existingAppointment = await Appointment.findOne({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .send("You have already booked an appointment at this date and time.");
    }*/
    // Check if there is already an appointment for the same doctor at the same date and time
    const existingDoctorAppointment = await Appointment.findOne({
      doctorId: req.body.doctorId,
      userId: req.locals,
      status :"Pending"
    });

    if (existingDoctorAppointment) {
      return res
        .status(400)
        .send("The doctor is not available at this date and time.");
    }
    // Check if the user has already booked an appointment with any other doctor at the same date and time
    const existingOtherDoctorAppointment = await Appointment.findOne({
      date: req.body.date,
      time: req.body.time,
      userId: req.locals,
    });

    if (existingOtherDoctorAppointment) {
      return res
        .status(400)
        .send(
          "You have already booked an appointment with another doctor at this date and time."
        );
    }

    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      stdtimeid: req.body.dateid,
      doctorId: req.body.doctorId,
      userId: req.locals,
      image: req.file.path, // add the image path to the appointment
    });
    const alreadyFound1 = await stdtime.findOneAndUpdate(
      { _id: req.body.dateid },
      { state: false }
    );

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked an appointment with student ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await doctornotification.save();

    const result = await appointment.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const Accept = async (req, res) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Accept" }
    );

    const usernotification = Notification({
      userId: req.body.userId,
      content: `Your appointment with ${req.body.doctorname} has been Accept`,
    });

    await usernotification.save();

    const user = await User.findById(req.body.userId);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been Accept`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment Accept");
  } catch (error) {
    res.status(500).send("Unable to Accept appointment");
  }
};
const Reject = async (req, res) => {
  try {
    const delDoc = await Appointment.findOneAndDelete({
      _id: req.body.appointid,
    });

    const alreadyFound1 = await stdtime.findOneAndUpdate(
      { _id: req.body.stdtimeid },
      { state: true }
    );
    const usernotification = Notification({
      userId: req.body.userId,
      content: `Your appointment with ${req.body.doctorname} has been rejected. Reason: ${req.body.content}`,
    });

    await usernotification.save();

    const user = await User.findById(req.body.userId);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been rejected. Reason: ${req.body.content}`,
    });

    await doctornotification.save();

    return res.status(201).send("Appointment rejected");
  } catch (error) {
    res.status(500).send("Unable to reject appointment");
  }
};

// const completed = async (req, res) => {
//   try {
//     const alreadyFound = await Appointment.findOneAndUpdate(
//       { _id: req.body.appointid },
//       { status: "Completed" }
//     );

//     const usernotification = Notification({
//       userId: req.locals,
//       content: `Your appointment with ${req.body.doctorname} has been completed`,
//     });

//     await usernotification.save();

//     const user = await User.findById(req.locals);

//     const doctornotification = Notification({
//       userId: req.body.doctorId,
//       content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
//     });

//     await doctornotification.save();

//     return res.status(201).send("Appointment completed");
//   } catch (error) {
//     res.status(500).send("Unable to complete appointment");
//   }
// };



module.exports = {
  getallappointments,
  bookappointment,
  Accept,
  Reject,
};
