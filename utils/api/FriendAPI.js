import axios from "axios";
import { PORT } from "./port";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getListFriendRequest(token) {
  const response = await axios
    .get(PORT + "/friend/list/req", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.addFriendReqs;
}

export async function accpetAddFriend(token, id) {
  const response = await axios
    .put(
      PORT + "/friend/status/" + id,
      {
        status: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response;
}


export async function findFriendByPhone(phoneNumber){
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(PORT +"/friend/find/" + phoneNumber,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  }).catch(function (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.header);
  });
  console.log(response.data);
  return response.data;
}