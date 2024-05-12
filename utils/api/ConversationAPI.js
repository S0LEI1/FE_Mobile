import axios from "axios";
import { PORT } from "./port";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getConversationByUserId() {
  const token = await AsyncStorage.getItem("token");
  console.log("token", token);
  const response = await axios
    .get(PORT + "/conversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.conversations;
}

export async function getConversationByIdAPI(id) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/conversation/con/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
    const conversation =response.data.conversation
  return conversation;
}
