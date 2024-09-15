import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = "http://localhost:5000/api";

const AdminDoctorTimes = () => {
  const [doctorTimes, setDoctorTimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllDoctorTimes = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/doctor/getAllDoctorTimes`);
      setDoctorTimes(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const deleteDoctorTime = async (doctorTimeId, state) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        if (state) {
          await toast.promise(
            axios.put(
              "/doctor/deletedate1",
              { doctorTimeId, state }, // send state with the request
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ),
            {
              success: "Doctor Time deleted successfully",
              error: "Unable to delete Doctor Time",
              loading: "Deleting Doctor Time...",
            }
          );
          getAllDoctorTimes();
        } else {
          alert("Cannot delete this time");
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctorTimes = doctorTimes.filter((doctorTime) =>
    `${doctorTime.userId.firstname} ${doctorTime.userId.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllDoctorTimes();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Student Times</h3>
          <input
            type="text"
            className="form-input"
            placeholder="Search..."
            onChange={handleSearch}
          />
          {filteredDoctorTimes.length > 0 ? (
            <div className="user-container1">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor name</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>State</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctorTimes?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.userId.firstname + " " + ele.userId.lastname}
                        </td>
                        <td>{ele?.time}</td>
                        <td>{ele?.date.split("T")[0]}</td>
                        <td>{ele?.state.toString()}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteDoctorTime(ele?._id, ele?.state);
                            }}
                          >
                            Remove
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

export default AdminDoctorTimes;
