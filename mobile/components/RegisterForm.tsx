import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FormItem from "./FormItem";
import { signUpUrl } from "../utils/base-url";
import { saveUser } from "../utils/saveSecure";
import post from "../utils/fetch/post";

// **** STYLING?????
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //   const { login, loading, setLoading } = useAuth(); // Hämta login-funktionen från context

  const handleRegistration = async () => {
    setError(null);
    if (
      email !== "" &&
      username !== "" &&
      password !== "" &&
      role !== "" &&
      company !== ""
    ) {
      const registerBody = {
        email: email,
        name: username,
        password: password,
        role: role,
        companyName: company,
      };

      try {
        const newToken = await post(signUpUrl, registerBody, "registration");
        console.log(newToken);
        saveUser(registerBody);
      } catch (err) {
        setError("Sign up failed, hold on a second");
      }
      // finally {
      //   setLoading(false);
      // }
    } else {
      setError("Please fill in all fields");
    }
  };
  return (
    <View aria-label="form" style={{ alignItems: "center" }}>
      <FormItem
        title="company"
        newValue={company}
        changeValue={setCompany}
        secure={false}
      />
      <FormItem
        title="role"
        newValue={role}
        changeValue={setRole}
        secure={false}
      />
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
        onPress={() => handleRegistration()}
      >
        <Text>Sign Up</Text>
      </Pressable>
      <Text>Message: {message}</Text>
      {error !== "" && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
};

export default RegisterForm;
