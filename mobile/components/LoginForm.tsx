import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FormItem from "./FormItem";
import login from "../utils/fetch/login";
import post from "../utils/fetch/post";
import { getProfUrl, signInUrl } from "../utils/base-url";
import get from "../utils/fetch/get";
import * as SecureStore from "expo-secure-store";
import { saveUser } from "../utils/saveSecure";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  //   const { login, loading, setLoading } = useAuth(); // Hämta login-funktionen från context

  const handleLogin = async () => {
    // setLoading(true);
    setError(null);
    if (email !== "" && username !== "" && password !== "") {
      const loginBody = {
        email: email,
        name: username,
        password: password,
      };

      try {
        const newToken = post(signInUrl, loginBody, "login");
        console.log(newToken);
        const userInfo = get(getProfUrl, newToken, "user");
        console.log(userInfo);
        saveUser(userInfo);
      } catch (err) {
        setError(
          "Login failed. Please check your name, email and password and try again."
        );
      }
      // finally {
      //   setLoading(false);
      // }
    } else {
      setError("Please fill in all fields");
    }
  };
  return (
    <View style={{ alignItems: "center" }}>
      <FormItem
        title="name"
        newValue={username}
        changeValue={setUsername}
        secure={false}
      />
      <FormItem
        title="email"
        newValue={email}
        changeValue={setEmail}
        secure={false}
      />
      <FormItem
        title="password"
        newValue={password}
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
