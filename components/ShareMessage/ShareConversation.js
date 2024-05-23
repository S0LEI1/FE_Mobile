import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ConversationItem from "./ConversationItem";

const ShareConversation = ({ conversations, style }) => {
  function renderShareConversation(itemData) {
    return <ConversationItem {...itemData.item} />;
  }
  return (
    <View style={style}>
      <Text>Gần đây</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={renderShareConversation}
      />
    </View>
  );
};

export default ShareConversation;

const styles = StyleSheet.create({});
