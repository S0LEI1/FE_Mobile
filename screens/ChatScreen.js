import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MessageOutput from "../components/Message/MessageOutput";
import MessageInput from "../components/Message/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../redux/MessageSlice";
import { fetchMessagesAPI } from "../utils/api/MessageAPI";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import openSocket from "socket.io-client";
const ChatScreen = ({ route }) => {
  const conversationSelecter = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const chatName = conversationSelecter.conversation.chatName;
  const navigation = useNavigation();
  const conversationId = route.params?.conversationId;
  const messageSelecter = useSelector((state) => state.messages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: chatName,
      headerRight: (color, size) => (
        <View style={styles.headerRight}>
          <Ionicons name="call-outline" size={24} color={color} />
          <Ionicons name="videocam-outline" size={24} />
          <Ionicons name="menu" size={24} />
        </View>
      ),
    });
  }, [conversationSelecter, chatName]);
  useEffect(() => {
    function fetchMessagesHandler() {
      if (messageSelecter.isLoader === true) {
        return <LoadingOverlay />;
      }
      dispatch(fetchMessages(conversationId));
      console.log("messageSelecter", messageSelecter);
    }
    fetchMessagesHandler();
  }, []);
  useEffect(()=>{
    const socket = openSocket('http://192.168.195.210:8000');
    socket.on('message', (data)=>{
       if(data.action ==="create"){
          dispatch(fetchMessages(conversationId))
       }
    },
    )
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <MessageOutput listMessages={messageSelecter.listMessage} />
      </View>
      <MessageInput conversationId={conversationSelecter.conversation._id} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  messageContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  inputContainer: {
    flex: 1,
  },
});
