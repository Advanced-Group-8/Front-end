import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FormItem from "./FormItem";
import login from "../utils/login";

// **** STYLING?????
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //   const { login, loading, setLoading } = useAuth(); // Hämta login-funktionen från context

  const handleLogin = async () => {
    // setLoading(true);
    setMessage("Button pressed");
    setError("");
    if (email !== "" && username !== "" && password !== "") {
      const loginBody = {
        email: email,
        name: username,
        password: password,
      };
      setMessage(loginBody.email);
      try {
        const successLogin = login(loginBody);
        setMessage(successLogin);
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
        secure={true}
      />
      {/* ***Button-component */}
      <Pressable
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={() => handleLogin()}
      >
        <Text>Log In</Text>
      </Pressable>
      <Text>Message: {message}</Text>
      {error !== "" && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
};

export default LoginForm;
