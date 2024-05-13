import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageItem = ({ content, senderAvatar, senderName,type, fileUrls }) => {
  return (
    <Pressable>
      <View>
        <Image source={{ uri: senderAvatar }} width={50} height={50} />
        <Text>{senderName}</Text>
      </View>
      <Text>{content}</Text>
      {
        fileUrls.length > 0 ? <Image width={50} height={50} source={{ uri: fileUrls[0] }} /> : ""
      }
    </Pressable>
  );
};

export default MessageItem;

const styles = StyleSheet.create({});
