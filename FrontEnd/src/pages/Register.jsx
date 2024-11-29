import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL =import.meta.env.VITE_SERVER_DOMAIN;
console.log(import.meta.env.VITE_SERVER_DOMAIN);

function Register() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    isAdmin: "public", // default value for isAdmin
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      try {
        console.log("Cloudinary URL:", import.meta.env.VITE_CLOUDINARY_BASE_URL);
        const res = await fetch(import.meta.env.VITE_CLOUDINARY_BASE_URL, {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        setFile(result.secure_url); // Use secure_url for better reliability
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Image upload failed");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { firstname, lastname, email, password, confpassword, isAdmin } = formDetails;
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
    }

    try {
      await toast.promise(
        axios.post("/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: file,
          isAdmin: isAdmin === "admin", // Convert to boolean
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
        }
      );
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
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
            onChange={(e) => onUpload(e.target.files[0])}
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
          <select
            name="isAdmin"
            className="form-input"
            value={formDetails.isAdmin}
            onChange={inputChange}
          >
            <option value="public">Doctor || User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading}
          >
            Sign Up
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
