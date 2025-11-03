import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FormItem from "./FormItem";

import post from "../utils/fetch/post";
import { getProfUrl, signInUrl } from "../utils/base-url";
import get from "../utils/fetch/get";
import * as SecureStore from "expo-secure-store";
import { saveUser } from "../utils/saveSecure";
import { saveLoggedIn } from "../utils/saveAsync";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setError(null);
    if (email !== "" && username !== "" && password !== "") {
      const loginBody = {
        email: email,
        name: username,
        password: password,
      };

      try {
        console.log(loginBody);
        const newToken = post(signInUrl, loginBody, "login");
        console.log(newToken);
        if (!newToken) throw new Error("can't login");

        const userInfo = get(getProfUrl, newToken, "user");
        console.log(userInfo);
        if (!newToken) throw new Error("can't get userinfo");

        saveUser(userInfo);
        saveLoggedIn(true);
      } catch (err) {
        setError(
          "Login failed. Please check your name, email and password and try again."
        );
        console.error("problem with logging in", err);
      }
    } else {
      setError("Please fill in all fields");
    }
  };
  return (
    <View style={{ alignItems: "center" }}>
      <FormItem
        title="name"
        newValue={"John Doe"}
        changeValue={setUsername}
        secure={false}
      />
      <FormItem
        title="email"
        newValue={"john.doe@example.com"}
        changeValue={setEmail}
        secure={false}
      />
      <FormItem
        title="password"
        newValue={"$2b$10$abcdefghijklmnopqrstuvwxyz"}
        changeValue={setPassword}
        secure={false}
      />
      {/* ***Button-component */}
      <Pressable
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={() => handleLogin()}
      >
        <Text>Log In</Text>
      </Pressable>
      <Text>Message: {message}</Text>
      {error !== null && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
};

export default LoginForm;
