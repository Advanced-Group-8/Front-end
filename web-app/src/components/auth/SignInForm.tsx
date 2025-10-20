import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../store/authSlice";
import type { AppDispatch } from "../../store/store";

function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(selectAuth);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(login({ email, name, password }));
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default SignInForm;
