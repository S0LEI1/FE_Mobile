import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ConversationOutput from "../components/Conversation/ConversationOutput";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../redux/conversationSlice";
import ModalUI from "../components/UI/Modal";

import openSocket from 'socket.io-client'
import { PORT } from "../utils/api/port";
import { getFriendReqs, getFriends } from "../redux/FriendSlice";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
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
    }
    fetchConversationHandler();
  }, [navigation]);
  const socket = openSocket(PORT);
  useLayoutEffect(()=>{
    socket.on("create-single-conversation", (data) => {
      if (data.action === "create") {
        dispatch(fetchConversations())
        dispatch(getFriends())
        dispatch(getFriendReqs());
      }
    });
  },[socket, navigation])
  return (
    <View style={styles.container}>
      <ConversationOutput listConversations={conversations.listConversations} />
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
