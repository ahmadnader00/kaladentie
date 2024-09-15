import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api";

function Register() {
  const [file, setFile] = useState("");
  const emailRegex = /^[^\s@]+@(?:gmail|hotmail)\.com$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{5,}$/;
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };
  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;
      if (file === "") return;

      const { firstname, lastname, email, password, confpassword } =
        formDetails;
      const data = new FormData();
      data.append("file", file);
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("email", email);
      data.append("password", password);

      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      } else if (!emailRegex.test(email)) {
        return toast.error("Email is invalid");
      } else if (firstname.trim().length === 0 || lastname.trim().length === 0) {
        return toast.error("The first or last name is invalid");
      } else if (!passwordRegex.test(password)) {
        return toast.error("The password must contain capital letters and numbers");
      }

      await toast.promise(axios.post("/user/register", data), {
        pending: "Registering user...",
        success: "User registered successfully",
        error: "Unable to register user",
        loading: "Registering user...",
      });
      return navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter your first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter your last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
