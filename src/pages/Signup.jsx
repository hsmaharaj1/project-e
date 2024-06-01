import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, googleProvider } from "../firebase.config";
import {createUserWithEmailAndPassword} from "firebase/auth"

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
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-left">Sign up</CardTitle>
                    <CardDescription className="text-left">
                        Enter your details to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {/* {errorMessage && <Alert severity="error">{errorMessage}</Alert>} */}
                        <form onSubmit={handleSubmit} className="grid gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-left">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={handleOnChange}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-left">Choose Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    type="password"
                                    required
                                />
                                <Label htmlFor="password" className="text-left">Confirm Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    type="password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create account
                            </Button>
                        </form>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already registered?{" "}
                        <Link to={"/login"} className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;