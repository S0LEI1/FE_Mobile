import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextMessage = ({ content }) => {
  return (
    <View style={styles.container}>
      <Text>{content}</Text>
    </View>
  );
};

export default TextMessage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
