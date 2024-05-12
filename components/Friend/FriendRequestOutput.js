import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accpetAddFriend } from "../../utils/api/FriendAPI";

const FriendRequestOutput = ({ listRequest }) => {
  console.log(listRequest);
  function renderRequest(itemData) {
    const item = itemData.item;
    return (
      <FriendRequestItem
        avatar={item.sender.avatar}
        name={item.sender.name}
        content={item.content}
        id={item._id}
      />
    );
  }
  if (listRequest.length <= 0) {
    return (
      <View>
        <Text style={styles.title}>Lời mời kết bạn</Text>
        <Text>Không có lời mời kết bạn</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.title}>Lời mời kết bạn</Text>
      <FlatList
        data={listRequest}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
      />
    </View>
  );
};

export default FriendRequestOutput;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
