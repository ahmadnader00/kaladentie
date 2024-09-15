import "../styles/doctorcard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import studenticon from "../img/download.jpg";

const DoctorCard = ({ ele }) => {
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }

    return navigate(`/BookAppointment`, { state: { ele } });
  };
  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          src={
            ele?.userId?.pic
              ? `http://localhost:5000/${ele.userId.pic.split("\\").pop()}`
              : studenticon
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
        {ele?.userId?.firstname + " " + ele?.userId?.lastname}
      </h3>
      <p className="year">
        <strong>year: </strong>
        {ele?.year}
      </p>
      <p className="mobile">
        <strong>email: </strong>
        {ele?.userId?.email}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele?.userId?.mobile}
      </p>
      <button className="btn appointment-btn" onClick={handleModal}>
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
