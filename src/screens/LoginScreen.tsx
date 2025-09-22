// Add this logic inside your LoginScreen.tsx component

import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // <-- IMPORT our hook
import { useNavigate } from "react-router-dom";

// ... inside your component's function body
const { login, signup } = useAuth(); // <-- GET the login/signup functions
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const { error } = await login(email, password); // <-- REAL LOGIN CALL

  if (error) {
    setError(error.message);
  } else {
    navigate("/dashboard"); // On success, go to the dashboard
  }
  setIsLoading(false);
};

// You can add a signup button to your form to call this function
const handleSignup = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const { error } = await signup(email, password); // <-- REAL SIGNUP CALL

  if (error) {
    setError(error.message);
  } else {
    // Let the user know they need to confirm their email
    alert("Signup successful! Check your email for a confirmation link.");
  }
  setIsLoading(false);
};
export default LoginScreen;
// In your JSX, make sure your input fields update the email and password state,
// and your buttons call the handleLogin or handleSignup functions.
