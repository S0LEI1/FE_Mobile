import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accpetAddFriend } from "../../utils/api/FriendAPI";
import { useNavigation } from "@react-navigation/native";

const FriendRequestItem = ({ id, name, avatar, content }) => {
  const navigation = useNavigation();
  async function acceptHandler() {
    try {
      const token = await AsyncStorage.getItem("token");
      await accpetAddFriend(token, id);
      navigation.navigate("Chat")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: avatar }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text>{content}</Text>
        </View>
      </View>
      <Button title="Chấp nhận" onPress={acceptHandler} />
    </View>
  );
};

export default FriendRequestItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    marginHorizontal: 8,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
