import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getUserByIdAPI } from "../../utils/api/LoginAPI";
import { useDispatch, useSelector } from "react-redux";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import MessageModal from "../UI/MessageModal";
import { Ionicons } from "@expo/vector-icons";
import { removeMessage } from "../../redux/MessageSlice";
const MessageItem = ({
  content,
  senderAvatar,
  senderName,
  fileUrls,
  senderId,
  type,
  currentUserId,
  updatedAt,
  style,
  _id
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.listMessage);
  console.log(messages.length);
  const [modalVisible, setModalVisible] = useState(false);
  function removeMessageHandler(){
    dispatch(removeMessage(_id));
  }
  function renderModal() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    pressed && [
                      styles.pressed,
                      { borderRadius: 12, backgroundColor: "#3888FF" },
                    ],
                  ]}
                >
                  <Ionicons
                    name="arrow-redo-outline"
                    size={16}
                    color={"#3888FF"}
                  />
                  <Text>Chuyển tiếp</Text>
                </Pressable>
                <Pressable
                  onPress={removeMessageHandler}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && [
                      styles.pressed,
                      { borderRadius: 12, backgroundColor: "#B11B17" },
                    ],
                  ]}
                >
                  <Ionicons name="reload-outline" size={16} color={"#B11B17"} />
                  <Text>Thu hồi</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    pressed && [
                      styles.pressed,
                      { borderRadius: 12, backgroundColor: "#FF0000" },
                    ],
                  ]}
                >
                  <Ionicons name="trash-outline" size={16} color={"#FF0000"} />
                  <Text>Xóa</Text>
                </Pressable>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  function onLongPressHandler() {
    setModalVisible(true);
  }
  return (
    <Pressable onLongPress={onLongPressHandler}>
      <View
        style={currentUserId === senderId ? styles.reverse : styles.container}
      >
        <Image source={{ uri: senderAvatar }} style={styles.avatar} />
        <View
          style={[
            styles.messageContainer,
            currentUserId === senderId && styles.reverseMessageContainer,
          ]}
        >
          <View>
            {type === "TEXTANDFILE" ? (
              <ImageMessage imageUrl={fileUrls[0]} />
            ) : (
              <TextMessage content={content} />
            )}
          </View>
        </View>
        {renderModal()}
      </View>
    </Pressable>
  );
};

export default MessageItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 8,
  },
  reverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  messageContainer: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 8,
    borderRadius: 12,
  },
  reverseMessageContainer: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    margin: 8,
  },
  modalView: {
    backgroundColor: "white",
    padding: 16,
    position: "absolute",
    borderRadius: 8,
    bottom: 10,
    // margin:16,
    width: "100%",
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
  button: {
    padding: 10,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
