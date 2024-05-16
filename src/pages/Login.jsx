import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="font-medium text-[1.6rem] my-4">Login Account</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2 items-start">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="border-2 px-1 box-border rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2 items-start">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="border-2 px-1 box-border rounded-md"
          />
        </div>
        <button type="submit" className="flex bg-[#2684ff] justify-center px-10 text-white rounded-md">Submit</button>
        <span className="flex float-end items-start">
          New here? <Link to={"/signup"}><span className="ml-2 font-bold">Signup</span></Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;