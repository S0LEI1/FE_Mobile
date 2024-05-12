import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageInput from './MessageInput'
import MessageItem from './MessageItem'

const MessageOutput = ({listMessages}) => {
  function renderMessage(itemData){
    return <MessageItem {...itemData.item} />
  }
  return (
    <FlatList data={listMessages} key={(item) => item._id} renderItem={renderMessage} />
  )
}

export default MessageOutput

const styles = StyleSheet.create({})