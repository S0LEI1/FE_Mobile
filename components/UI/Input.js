import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({title, placeholder, inputConfig}) => {
  return (
    <View style={{width:'100%'}}>
      <Text style={styles.text}>{title}</Text>
      <TextInput style={styles.textInput} placeholder={placeholder} {...inputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    text:{
        fontSize:16
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:"black",
        padding: 6,
    }
})