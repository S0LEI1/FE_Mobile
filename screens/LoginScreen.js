import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../components/UI/Input";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <LoginForm />
      <Pressable onPress={() => navigation.navigate("RegisterForm")}>
        <Text>Don't have an account</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

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
