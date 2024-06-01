import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Alert from "@mui/material/Alert";
import { auth, googleProvider } from "../firebase.config";
import { signInWithRedirect, getRedirectResult, signOut, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };


  // Email and password sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      console.log(token)

      const { data } = await axios.post(
        "http://localhost:4000/login",
        { token, password },
        { withCredentials: true }
      );

      const { success, message, token: jwtToken } = data;
      if (success) {
        localStorage.setItem("token", jwtToken); // Store the JWT token in local storage
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Couldn't login");
    }

    setInputValue({ email: "", password: "" });
  };


  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      setErrorMessage("Couldn't sign in with Google");
    }
  };

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const { user } = result;
        if (user) {
          // User signed in successfully
          // Proceed with your application logic
          console.log("User signed in:", user.email);
          // Send user data to backend for authentication
          const token = await user.getIdToken();
          console.log(token)
          const { data } = await axios.post(
            "http://localhost:4000/google-signin",
            { token },
            { withCredentials: true }
          );
          const { success, message, token: jwtToken } = data;
          if (success) {
            // Store JWT token in local storage or state
            localStorage.setItem("token", jwtToken);
            console.log(data.result._id)
            localStorage.setItem("userId", data.result._id)
            console.log(message, jwtToken)
            // Redirect user to the desired page
            setTimeout(() => navigate("/"), 1000);
          } else {
            // Handle authentication failure
            setErrorMessage(message);
          }
        } else {
          // No user signed in
          console.log("No user signed in");
        }
      } else {
        // Handle case where result is null
        console.error("No result returned from Google sign-in");
        // setErrorMessage("Couldn't sign in with Google");
      }
    } catch (error) {
      // Handle error
      console.error("Error signing in with Google:", error);
      // setErrorMessage("Couldn't sign in with Google");
    }
  };

  useEffect(() => {
    handleRedirectResult(); // Call handleRedirectResult when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-left">Login</CardTitle>
          <CardDescription className="text-left">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
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
                Login
              </Button>
            </form>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
