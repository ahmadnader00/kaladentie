import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Empty from "./Empty";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";

axios.defaults.baseURL = "http://localhost:5000/api";

const BookAppointment = ({ }) => {
  const location = useLocation();

  const [getdate, setdate] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showdoctordate = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await toast.promise(
        axios.get("/doctor/showdoctordate", {
          params: {
            doctorId: location.state.ele.userId._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Date retrieved successfully",
          error: "Unable to get date",
          loading: "Fetching date...",
        }
      );
      setdate(Array.from(temp.data));
      dispatch(setLoading(false));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    showdoctordate();
  }, []);

  const bookAppointment = async (dateid, date, time) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);
      formData.append("doctorId", location.state.ele.userId._id);
      formData.append("dateid", dateid);
      formData.append("date", date);
      formData.append("time", time);
      formData.append(
        "doctorname",
        `${location.state.ele.userId.firstname} ${location.state.ele.userId.lastname}`
      );

      await toast.promise(
        axios.post("/appointment/bookappointment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="page-heading">Book Appointment</h2>
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h3 className="home-sub-heading">All Date</h3>
          <input
                            className="form-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            id="pic"
                            onChange={onFileChange}
                          /> 
          {getdate.length > 0 ? (
            <div className="notifications">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Select date</th>
                  </tr>
                </thead>
                <tbody>
                  {getdate?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele.date.split("T")[0]}</td>
                        <td>{ele.time}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() =>
                              bookAppointment(
                                ele._id,
                                ele.date.split("T")[0],
                                ele.time
                              )
                            }
                          >
                            Book appointment
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default BookAppointment;