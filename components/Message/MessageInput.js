import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../../redux/MessageSlice";
import { sendMessageAPI } from "../../utils/api/MessageAPI";
import openSocket from 'socket.io-client'
const MessageInput = ({ conversationId }) => {
  const conversationSelecter = useSelector((state) => state.conversations);
  const messageSelecter = useSelector((state) => state.messages);
  // console.log(conversationSelecter);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  function setContentHandler(enteredValue) {
    setContent(enteredValue);
  }
  async function sendMessageHandler() {
    const params ={
      conversationId: conversationSelecter.conversation._id,
      content: content
    }
    dispatch(sendMessage(params));
    setContent("");
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Ionicons name="happy-outline" size={24} />
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Tin nhắn" value={content} onChangeText={setContentHandler} />
      </View>
      <Pressable style={styles.button}>
        <Ionicons size={24} name="image-outline" />
      </Pressable>
      <Pressable
        onPress={sendMessageHandler}
        style={[styles.button, styles.sendButton]}
      >
        <Ionicons size={20} name="send-outline" />
      </Pressable>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  inputContainer: {
    flex: 1,
    margin: 10,
    height: "100%",
  },
  button: {
    paddingHorizontal: 10,
  },
  sendButton: {
    height: "100%",
    backgroundColor: "cyan",
    padding: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
