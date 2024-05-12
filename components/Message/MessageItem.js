import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageItem = ({content, senderAvatar, senderName}) => {
  return (
    <Pressable>
      <Image source={{uri: senderAvatar}} width={50} height={50}/>
      <Text>{content}</Text>
      <Text>{senderName}</Text>
    </Pressable>
  )
}

export default MessageItem

const styles = StyleSheet.create({})