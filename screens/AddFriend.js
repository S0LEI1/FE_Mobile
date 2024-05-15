import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/UI/Button';
import { addFriendAPI } from '../utils/api/FriendAPI';
import { addFriend } from '../redux/FriendSlice';

const AddFriend = ({navigation}) => {
    const userInfo = useSelector((state) => state.friends.friendInfo);
    const dispatch = useDispatch();
  console.log(userInfo);
    const [content, setContent] = useState("Rất vui được kết bạn với bạn....")
    function setContentHandler(enteredValue){
        setContent(enteredValue);
    }
    async function addFriendHandler(){
        const params ={
            id: userInfo._id,
            content: content
        }
        dispatch(addFriend(params));
        navigation.navigate("Home")
    }
  return (
    <View style={styles.container}>
      <View>
        <Image source={{uri: userInfo.avatar}} width={100} height={100} />
      <Text>{userInfo.name}</Text>
      </View>
      <View>
        <TextInput multiline value={content} onChangeText={setContentHandler} />
      </View>
      <View>
        <Button style={styles.button} title={"Kết bạn"} onPress={addFriendHandler} />
      </View>
    </View>
  )
}

export default AddFriend

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        backgroundColor:"blue"
    }
})