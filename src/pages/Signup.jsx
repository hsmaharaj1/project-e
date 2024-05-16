import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
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
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                console.log(message);
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="font-medium text-[1.6rem] my-4">Signup Account</div>
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
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
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
                <span>
                    Already have an account? <Link to={"/login"}><span className="font-bold">Login</span></Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;