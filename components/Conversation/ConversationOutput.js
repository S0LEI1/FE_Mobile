import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ConversationItem from "./ConversationItem";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getConversationById } from "../../utils/api/ConversationAPI";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../redux/conversationSlice";
import LoadingOverlay from "../UI/LoadingOverlay";

const ConversationOutput = ({ listConversations }) => {
  const navigation = useNavigation();
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  async function getConversationHandler(conversationId) {
    dispatch(getConversation(conversationId));
    if (conversations.isLoader === true) {
      return <LoadingOverlay />;
    }
    if (conversations.isLoader === false && conversations.isError === true) {
      Alert.alert("Erorr", "Could not get conversation");
      return;
    }

    navigation.navigate("Chat", { conversationId: conversationId });
  }

  function renderConversation(itemData) {
    const item = itemData.item;
    return (
      <ConversationItem
        name={item.name}
        avatar={itemData.item.avatar}
        onPress={getConversationHandler.bind(this, item.conversationId)}
      />
    );
  }
  return (
    <FlatList
      data={listConversations}
      keyExtractor={(item) => item.conversationId}
      renderItem={renderConversation}
    />
  );
};

export default ConversationOutput;

const styles = StyleSheet.create({});
