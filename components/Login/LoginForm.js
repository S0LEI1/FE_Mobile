import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { login } from "../../utils/api/LoginAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../../redux/authSlice";
const LoginForm = () => {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({
    phoneNumber: "",
    password: "",
  });
  const authToken = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      const token = await AsyncStorage.getItem("token");
      try {
        if (token) {
          navigation.replace("Home");
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkLogin();
  }, []);
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  async function loginWithPhoneNumberHandler() {
    dispatch(loginHandler(inputValues));
    if(authToken.token)
      navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <Input
        title={"Phone number: "}
        placeholder={"Enter your phone number"}
        inputConfig={{
          value: inputValues.email,
          onChangeText: inputChangeHandler.bind(this, "phoneNumber"),
          keyboardType: "decimal-pad",
        }}
      />
      <Input
        title={"Password"}
        placeholder={"Enter your password"}
        inputConfig={{
          value: inputValues.password,
          onChangeText: inputChangeHandler.bind(this, "password"),
        }}
      />
      <Button title={"Sign in"} onPress={loginWithPhoneNumberHandler} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});
