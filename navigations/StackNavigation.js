import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomNavigation from "./BottomNavigation";
import ChatScreen from "../screens/ChatScreen";
import ModalUI from "../components/UI/Modal";
import AddFriend from "../screens/AddFriend";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={BottomNavigation} options={{headerShown:false}} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddFriend" component={AddFriend} options={{
          presentation:"modal"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
