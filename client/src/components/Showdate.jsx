import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/notification.css";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "./Loading";
import "../styles/user.css";

const Showdate = () => {
  const [getdate, setdate] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const showalldate = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/doctor/showalldate`);
      setdate(temp);
      dispatch(setLoading(false));
    } catch (error) { }
  };


  const deletedate = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/deletedate",
            { userId},
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "date deleted successfully",
            error: "Unable to delete date",
            loading: "Deleting date...",
          }
        );
        showalldate();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    showalldate();
  }, []);
  console.log(getdate);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h3 className="home-sub-heading">All Date</h3>
          {getdate.length > 0 ? (
            <div className="notifications">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {getdate?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.date.split("T")[0]}</td>
                        <td>{ele?.time}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deletedate(ele?._id);
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

export default Showdate;
