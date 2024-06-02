import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Alert from "@mui/material/Alert";
import { auth, googleProvider } from "../firebase.config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        confirm_password: ""
    });
    const [message, setMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { email, password, confirm_password } = inputValue;

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
            if (password === confirm_password) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                await sendEmailVerification(userCredential.user)

                setSuccessMessage("A verification email has been sent to your email address. Please check your inbox and verify your email.")
                setMessage("")
                const { data } = await axios.post(
                    "http://localhost:4000/signup",
                    { ...inputValue },
                    { withCredentials: true }
                )
                if (data.success) {
                    // setMessage(data.message);
                    setTimeout(() => redirect("/"), 100)
                } else {
                    setMessage(data.message)
                }
            } else {
                setMessage("Passwords doesn't match")
                setInputValue({ email: email, password: "", confirm_password: "" })
                return
            }

        } catch (error) {
            console.error(error);
            setMessage("Signup failed. Please try again.");
        }

        setInputValue({
            email: "",
            password: "",
            confirm_password: ""
        });
    };

    return (
        <>
            <div className="absolute flex w-fit h-auto top-8 left-0 right-0 z-10 items-center mx-auto">
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
            </div>
            
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-left">Sign up</CardTitle>
                        <CardDescription className="text-left">
                            Enter your details below to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {message && <Alert severity="error">{message}</Alert>}
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
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={confirm_password}
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
        </>
    );
};

export default Signup;