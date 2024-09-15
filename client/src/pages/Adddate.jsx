import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import toast from "react-hot-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Showdate from '../components/Showdate';

const availableTimes = [
  '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM',
];

const Adddate = () => {
  const [formDetails, setFormDetails] = useState({
    date: null,
    time: "",
  });

  const inputChange = (name, value) => {
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addAppointment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/doctor/adddate",
          {
            formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "added date successfully",
          error: "Unable to add date",
          loading: "adding ...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  const filterDate = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to the beginning of the current day
    return date.getDay() !== 4 && date.getDay() !== 5 && date >= currentDate;
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center apply-doctor" id="contact">
        <div className="register-container flex-center contact">
          <h2 className="page-heading">add date</h2>
          <form className="register-form">
            <DatePicker
              id="date"
              name="date"
              className="form-input"
              placeholderText="Select date"
              filterDate={filterDate}
              selected={formDetails.date}
              onChange={(date) => inputChange('date', date)}
              onKeyDown={(e) => e.preventDefault()}
            />

            <select
              name="time"
              value={formDetails.time}
              className="form-input"
              id="time"
              onChange={(e) => inputChange('time', e.target.value)}
            >
              <option value="">Select time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="btn form-btn"
              onClick={addAppointment}
            >
              Add
            </button>
          </form>
        </div>
      </section>
      <Showdate />
      <Footer />
    </>
  );
};

export default Adddate;