import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
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

    const handleGoogleSignIn = async () => {
        try {
            
        } catch (error) {

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/signup",
                { ...inputValue },
                { withCredentials: true }
            );
            if (data.success) {
                toast.success(data.message, { position: "bottom-right" });
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error(data.message, { position: "bottom-left" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Please try again.", { position: "bottom-left" });
        }

        setInputValue({
            email: "",
            password: "",
        });
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="font-medium text-[1.6rem] my-4">Create an account</div>
            <Button onClick={handleGoogleSignIn}>
                <FaGoogle />
                <span className="mx-2">Google</span>
            </Button>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2 items-start">
                    <label htmlFor="email">Email</label>
                    <Input name="email" value={email} placeholder="xyz@example.com" onChange={handleOnChange} />
                </div>
                <div className="flex flex-col mb-2 items-start">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleOnChange}
                    />
                </div>
                <Button type="submit" className="w-[15rem] h-8">Create account</Button>

                <div>
                    Already have an account? <Link to={"/login"}><span className="font-bold">Login</span></Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;