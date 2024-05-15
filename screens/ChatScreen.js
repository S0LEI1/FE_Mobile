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
import { PORT } from "../utils/api/port";
import { getConversation } from "../redux/conversationSlice";
const ChatScreen = ({ route }) => {
  const conversationSelecter = useSelector((state) => state.conversations);
  const messageSelecter = useSelector((state) => state.messages);
  console.log(conversationSelecter.conversation);
  const dispatch = useDispatch();
  const chatName = conversationSelecter.conversation?.name;
  const navigation = useNavigation();
  const conversationIdFromRoute = route.params?.conversationId ;
  const conversationId = conversationIdFromRoute ? conversationIdFromRoute : conversationSelecter.conversation?._id;
  console.log("conversationIdFromRoute", conversationIdFromRoute);
  // console.log("conversation from redux", conversationSelecter.conversation._id);
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
    async function fetchMessagesHandler() {
      if (messageSelecter.isLoader === true) {
        return <LoadingOverlay />;
      }
      if(conversationId !== undefined){
        dispatch(fetchMessages(conversationId));
      }
    }
    fetchMessagesHandler();
  }, [conversationId, navigation]);
  const socket = openSocket(PORT);
  useLayoutEffect(() => {
    socket.on("message", (data) => {
      if (data.action === "create") {
        dispatch(fetchMessages(conversationId));
      }
    });
  }, [socket]);
  // useLayoutEffect(()=>{
  //   socket.on("create-single-conversation", (data) => {
  //     if (data.action === "create") {
  //       dispatch(getConversation(data.conversation._id));
  //       dispatch(fetchMessages(data.conversation._id));
  //       console.log(conversationSelecter);
  //     }
  //   });
  // },[socket, navigation])
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <MessageOutput listMessages={messageSelecter.listMessage} />
      </View>
      <MessageInput />
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
