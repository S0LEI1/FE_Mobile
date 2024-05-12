import axios from "axios";
import { PORT } from "./port";
export async function login(phoneNumber, password) {
  const response = await axios
    .post(PORT + "/auth/login", {
      phoneNumber: phoneNumber,
      password: password,
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  const token = response.data.token;
  return token;
}

export async function getUserById(token) {
  const response = await axios
    .get(PORT + "/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.user;
}
