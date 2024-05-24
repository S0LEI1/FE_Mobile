import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ConversationOutput from "../components/Conversation/ConversationOutput";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../redux/conversationSlice";
import ModalUI from "../components/UI/Modal";

import openSocket from "socket.io-client";
import { PORT } from "../utils/api/port";
import { getFriendReqs, getFriends } from "../redux/FriendSlice";
import { getUser } from "../redux/authSlice";
import { addMessage, resetShare } from "../redux/MessageSlice";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const conversationsSelector = useSelector((state) => state.conversations);
  const userSelector = useSelector((state) => state.auth);
  const currentUserId = userSelector.userId;
  const conversations = conversationsSelector.listConversations;
  const dispatch = useDispatch();
  const socket = openSocket(PORT);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text>Tin nhắn</Text>,
      headerRight: (color, size) => (
        <View style={styles.headerRight}>
          <Ionicons
            name="add"
            size={24}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      ),
    });
  }, []);
  useLayoutEffect(() => {
    async function fetchConversationHandler() {
      dispatch(fetchConversations());
      dispatch(getUser());
      dispatch(getFriends());
      dispatch(getFriendReqs());
    }
    fetchConversationHandler();
  }, []);

  useEffect(() => {
    if (!conversations) return;

    const conversationIds = conversations.map(
      (conversationEle) => conversationEle.conversationId
    );

    socket.emit("join-conversations", conversationIds);
    socket.emit("join", currentUserId);
  }, [conversations]);

  useLayoutEffect(() => {
    socket.on("create-single-conversation", (data) => {
      if (data.action === "create") {
        dispatch(fetchConversations());
      }
    });
    // socket.on("message", (data) => {
    //   console.log("data from socket", data);
    // });
  }, []);
  const isFocused = useIsFocused();
  useEffect(()=>{
    dispatch(resetShare());
  },[isFocused])
  return (
    <View style={styles.container}>
      <ConversationOutput
        listConversations={conversations}
        currentUserId={userSelector.userId}
      />
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        {modalVisible && <ModalUI />}
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 8,
  },
});
