import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Pressable, Text, View } from "react-native";

const LoginScreen = () => {
  const [registered, setRegistered] = useState(true);
  return (
    <View>
      {registered ? <LoginForm /> : <RegisterForm />}
      <Text>
        {registered ? "Don't have a login?" : "Already have an account?"}
      </Text>
      <Pressable
        style={{ borderColor: "black", borderWidth: 1 }}
        onPress={() => setRegistered(!registered)}
      >
        <Text>{registered ? "Sign Up" : "Sign In"}</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
