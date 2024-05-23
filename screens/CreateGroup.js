import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import GroupInput from "../components/Group/GroupInput";
import { useSelector } from "react-redux";
import ConversationItem from "../components/ShareMessage/ConversationItem";

const CreateGroup = () => {
  const { friends } = useSelector((state) => state.friends);
  function renderConversationItem(itemData) {
    console.log(itemData);
    return <ConversationItem {...itemData.item} />;
  }
  return (
    <View style={styles.container}>
      <GroupInput />
      <View>
        <Text>Danh sách bạn bè</Text>
        <FlatList
          data={friends}
          key={(item) => item._id}
          renderItem={renderConversationItem}
        />
      </View>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});
