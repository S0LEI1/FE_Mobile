import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { useSelector } from "react-redux";

const UserInfo = ({navigation}) => {
  const userInfo = useSelector((state) => state.friends.friendInfo);
  console.log(userInfo);

    function addFriendHandler(){
        navigation.navigate("AddFriend")
    }

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: userInfo.avatar }} width={200} height={200} />
        <Text>{userInfo.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={"Kết bạn"} style={styles.addFriendButton} onPress={addFriendHandler} />
        <Button title={"Nhắn tin"} style={styles.addFriendButton} />
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addFriendButton: {
    flex: 1,
    backgroundColor: "green",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
  },
});
