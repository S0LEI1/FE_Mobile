import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getConversationByUserId } from "../utils/api/ConversationAPI";
import { useDispatch, useSelector } from "react-redux";
import ShareConversation from "../components/ShareMessage/ShareConversation";
import ShareOutput from "../components/ShareMessage/ShareOutput";
import MessageModal from "../components/UI/MessageModal";
import ShareModal from "../components/UI/ShareModal";
import { resetShare } from "../redux/MessageSlice";
import { shareMessageAPI } from "../utils/api/MessageAPI";

const ShareScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state) => state.conversations.listConversations
  );
  const shareConversation = useSelector(
    (state) => state.messages.shareConversation
  );
  const shareMessage = useSelector((state) => state.messages.shareMessage);
  const shareConversationId = shareConversation.map(conversation => conversation._id);
  async function shareMessageHandler(){
    console.log(shareMessage._id);
    for (let index = 0; index < shareConversationId.length; index++) {
        console.log(shareConversationId[index]);
        // await shareMessageAPI(shareMessage._id, shareConversationId[index])        
    }
  }
  function leaveShareHandler() {
    dispatch(resetShare());
    navigation.pop();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chia sẻ",
      headerLeft: (color) => (
        <Ionicons
          name="arrow-back"
          size={24}
          color={color}
          onPress={leaveShareHandler}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <Text>Tìm kiếm</Text>
      <ShareConversation
        style={styles.shareConversationContainer}
        conversations={conversations}
      />
      {shareConversation.length >= 1 && (
        <ShareOutput
        onPress={shareMessageHandler}
          style={styles.shareOutputContainer}
          shareData={shareConversation}
          {...shareMessage}
        />
      )}
    </View>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  shareConversationContainer: {
    flex: 3,
  },
  shareOutputContainer: {
    flex: 1,
    width:"95%",
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    // position: "absolute",
    bottom: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
