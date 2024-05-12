import { View, Text, Pressable, Touchable, StyleSheet } from "react-native";
import React from "react";

const Button = ({ title, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginTop: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.7,
  },
});
