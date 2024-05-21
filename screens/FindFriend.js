import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getFriendByPhoneNumber } from "../redux/FriendSlice";
const FindFriend = ({navigation}) => {
    const friendSelector = useSelector((state)=> state.friends);
    const dispatch = useDispatch();
    console.log(friendSelector);
    const [phoneNumber, setPhoneNumber] = useState("");
    function setPhoneNumberHandler(enteredValue){
        setPhoneNumber(enteredValue);
    }
    async function findFriendHandler(){
        dispatch(getFriendByPhoneNumber(phoneNumber))
        if(friendSelector.isLoading === false && friendSelector.isError === false){
          navigation.navigate("UserInfo")
        }
    }
  return (
    <View style={styles.container}>
      <View>
        <Text>QR code</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.phoneInputContainer}>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>+84</Text>
          </View>
          <TextInput onChangeText={setPhoneNumberHandler} style={styles.input} keyboardType="phone-pad" placeholder="Nhập số điện thoại" />
        </View>
        <Pressable onPress={findFriendHandler}>
          <View style={styles.button}>
            <Ionicons name="arrow-forward" size={24} color={"white"} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default FindFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInputContainer: {
    flexDirection: "row",
    flex: 1,
    height:"100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius:10
  },
  codeContainer:{
    backgroundColor:"gray",
    height:"100%",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  input:{
    flex:6,
    height:"100%",
    padding:8
  },
  codeText:{
    color:"white",
    fontSize:16
  },
  button:{
    backgroundColor:"blue",
    height:"100%",
    width:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
    marginLeft:8
  }
});
