import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { fetchUserProfile } from "../../store/userSlice";
import api from "../../api/axios";

function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/sign-in", {
        email,
        password,
        name,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(fetchUserProfile()); // fetch profile immediately
      window.history.back();
      
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit">Sign in</button>
    </form>
  );
}

export default SignInForm;
