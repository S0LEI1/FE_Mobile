import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const RegisterForm = () => {
  return (
    <View style={styles.container}>
      <Input title={"Name"} placeholder={"Enter your name"} />
      <Input title={"Email"} placeholder={"Enter your email"} />
      <Input title={"Password"} placeholder={"Enter your password"} />
      <Button title={"Sign up"} />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: 'white'
  },
});
