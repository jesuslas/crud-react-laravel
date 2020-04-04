import axios from "axios";
import { baseUrl } from "../config";

export const signIn = (user, password) => {
  return axios.post(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ user, password })
  });
};
