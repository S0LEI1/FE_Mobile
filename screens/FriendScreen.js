import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FriendRequestOutput from "../components/Friend/FriendRequestOutput";
import ListFriend from "../components/Friend/ListFriend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListFriendRequest } from "../utils/api/FriendAPI";
import openSocket from 'socket.io-client'
import { PORT } from "../utils/api/port";
const FriendScreen = () => {
    const [listReqs, setListReqs] = useState([]);
  useEffect(() => {
    async function fetchListRequest() {
      const token = await AsyncStorage.getItem("token");
      const listReqs = await getListFriendRequest(token);
      setListReqs(listReqs)
    }
    fetchListRequest();
  }, []);
  return (
    <View style={styles.container}>
      <FriendRequestOutput listRequest={listReqs} />
      <ListFriend />
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  container:{
    margin: 12,
    backgroundColor:"white"
  }
});
