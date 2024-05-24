import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const GroupInput = () => {
  return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => [styles.imageContainer, pressed && styles.pressed]}>
        <Ionicons name="image-outline" size={24} />
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nhập tên nhóm" />
      </View>
    </View>
  );
};

export default GroupInput;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    marginTop: 12,
    alignItems:"center",
    justifyContent:"space-around"
  },
  imageContainer:{
    borderWidth:1,
    borderColor:"#D8D8D8",
    padding:12,
    borderRadius:24
  },
  inputContainer: {
    width: "80%",
    height: "80%",
    borderRadius:12,
    borderWidth:1,
    borderColor:"#D8D8D8",
  },
  input: {
    width: "100%",
    height: "100%",
    padding:12,
    fontSize:16
  },
  image:{
    color: "#3888FF"
  },
  pressed:{
    borderColor:"#3888FF",
  }
});
