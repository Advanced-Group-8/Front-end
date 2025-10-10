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
  //   const { login, loading, setLoading } = useAuth(); // Hämta login-funktionen från context

  const handleLogin = async () => {
    // setLoading(true);
    setError("");
    if (email !== "" && username !== "" && password !== "") {
      const loginBody = {
        email: email,
        name: username,
        password: password,
      };
      try {
        await login(loginBody); // Anropar login från AuthContext
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
    <View>
      <FormItem newValue={username} changeValue={setUsername} secure={false} />
      <FormItem newValue={email} changeValue={setEmail} secure={false} />
      <FormItem newValue={password} changeValue={setPassword} secure={true} />
      {/* ***Button-component */}
      <Pressable onPress={() => handleLogin}>
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;
