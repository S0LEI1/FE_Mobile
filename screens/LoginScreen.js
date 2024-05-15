import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../components/UI/Input";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>

      <LoginForm />
      <Pressable style={{ marginTop: 20 }} onPress={() => navigation.navigate("Signup")}>
        <Text>Do not have an account? <Text style={styles.registerText}> register</Text></Text>
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
  registerText: {
    color: 'blue', // Màu chữ cho "register"
    textDecorationLine: 'underline', // Gạch chân chữ "register"
    fontWeight: 'bold', // Tùy chọn: Đậm chữ "register"
  },
});
