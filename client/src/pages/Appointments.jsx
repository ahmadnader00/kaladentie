import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import "../styles/register.css";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px", // Adjust this value to change the width of the modal
    height: "200px", // Adjust this value to change the height of the modal
  },
};
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // New state for the selected image

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRejectionReasonChange = (event) => {
    setRejectionReason(event.target.value);
  };

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      const appointmentsWithImages = temp.map((appointment) => ({
        ...appointment,
        image: `http://localhost:5000/${appointment.image.replace(
          "public",
          ""
        )}`,
      }));
      setAppointments(appointmentsWithImages);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const Accept = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/Accept",
          {
            userId: ele?.userId,
            stdtimeid: ele?.stdtimeid,
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.doctorId?.firstname} ${ele?.doctorId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment Accept successfully",
          error: "Unable to Accept appointment",
          loading: "Accepting appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const Reject = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/Reject",
          {
            userId: ele?.userId,
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.doctorId?.firstname} ${ele?.doctorId?.lastname}`,
            content: rejectionReason, // send the rejection reason to the server
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment Reject successfully",
          error: "Unable to Reject appointment",
          loading: "Rejecting appointment...",
        }
      );
      getAllAppoint();
      closeModal();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section ">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Students</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {userId === appointments[0].doctorId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname +
                            " " +
                            ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        {userId === ele?.doctorId?._id ? (
                          ele?.status === "Accept" ? (<button className={`btn noaction-btn`}>no action</button>) : 
                          <td>
                            <button
                              className={`btn user-btn accept-btn ${
                                ele?.status === "Accept" ? "disable-btn" : ""
                              }`}
                              disabled={ele?.status === "Accept"}
                              onClick={() => Accept(ele)}
                            >
                              Accept
                            </button>
                            <button
                              className={`btn user-btn ${
                                ele?.status === "Accept" ? "disable-btnn" : ""
                              }`}
                              disabled={ele?.status === "Accept"}
                              onClick={openModal}
                            >
                              Reject
                            </button>
                            <Modal
                              isOpen={modalIsOpen}
                              onRequestClose={closeModal}
                              contentLabel="Rejection Reason Modal"
                              style={customStyles}
                            >
                              <h4>Enter Rejection Reason</h4>
                              <input
                                className="form-input"
                                type="text"
                                value={rejectionReason}
                                onChange={handleRejectionReasonChange}
                              />
                              <button
                                className="btn user-btn "
                                onClick={() => Reject(ele)}
                              >
                                Submit
                              </button>
                              <button
                                className="btn user-btn"
                                onClick={closeModal}
                              >
                                Cancel
                              </button>
                            </Modal>
                          </td>
                        ) : (
                          <></>
                        )}
                        <td>
                          <img
                            src={ele.image}
                            alt="Appointment"
                            style={{ width: "50px", height: "50px" }}
                            onClick={() => setSelectedImage(ele.image)} // Set the selected image when the image is clicked
                          />
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

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected Appointment"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Appointments;
