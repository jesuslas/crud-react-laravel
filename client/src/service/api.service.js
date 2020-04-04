import axios from "axios";
import { baseUrl } from "../config";

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
export const deleteTickets = ticket => {
  return axios.delete(`${baseUrl}/tickets/${ticket}`, {
    method: "POST",
    body: JSON.stringify(deleteTickets)
  });
};
