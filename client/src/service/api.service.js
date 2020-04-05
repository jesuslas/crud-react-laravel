import axios from "axios";
import { baseUrl } from "../config";
import store from "../redux/index";

let user = store.getState().user || null;

store.subscribe(() => {
  user = store.getState().user || null;
});
console.log("user", user);
export const signIn = (user, password) => {
  return axios.post(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ user, password })
  });
};

export const getAllTickets = userId => {
  const params = userId ? `?userId=${userId}` : "";
  return axios.get(`${baseUrl}/tickets${params}`);
};
export const getAllUsers = () => {
  return axios.get(`${baseUrl}/users`);
};
export const getAllUserTypes = () => {
  return axios.get(`${baseUrl}/usertypes`);
};

export const addTickets = (ticket, userId) => {
  return axios.post(`${baseUrl}/tickets`, {
    method: "POST",
    body: JSON.stringify({
      ticketPedido: "default",
      userId,
      ...ticket
    })
  });
};
export const addUserTypes = userType => {
  return axios.post(`${baseUrl}/usertypes`, {
    method: "POST",
    body: JSON.stringify({
      name: "dafault",
      ...userType
    })
  });
};
export const addUser = user => {
  return axios.post(`${baseUrl}/users`, {
    method: "POST",
    body: JSON.stringify({
      name: "default",
      userTypes: 1,
      email: "co@co.com",
      password: "123",
      ...user
    })
  });
};
export const deleteTickets = ticket => {
  return axios.delete(`${baseUrl}/tickets/${ticket}`);
};
export const deleteUserTypes = userTypeId => {
  return axios.delete(`${baseUrl}/usertypes/${userTypeId}`);
};

export const deleteUser = userId => {
  return axios.delete(`${baseUrl}/tickets/${userId}`);
};

export const updateTicket = (ticketId, properties) => {
  return axios.patch(`${baseUrl}/tickets/${ticketId}`, {
    method: "PATCH",
    body: JSON.stringify(properties)
  });
};

export const updateUser = (userId, properties) => {
  return axios.patch(`${baseUrl}/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(properties)
  });
};
export const updateUserTypes = (userTypeId, properties) => {
  return axios.patch(`${baseUrl}/usertypes/${userTypeId}`, {
    method: "PATCH",
    body: JSON.stringify(properties)
  });
};
