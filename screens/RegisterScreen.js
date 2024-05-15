import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "../components/Login/RegisterForm";

const RegisterScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.signIn}>Sign up</Text>
        <Text>Sign up Your Account</Text>
      </View>
      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 18,
    margin: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  signIn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});
