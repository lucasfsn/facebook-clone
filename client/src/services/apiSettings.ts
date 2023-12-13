import axios from "axios";
import { ChangePassword, ChangeUserSettings } from "../types/settings";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function changePassword(user: ChangePassword) {
  const { data } = await axios.patch(`${apiUrl}/change-password`, user);

  const { message } = data;

  return { message };
}

export async function changeSettings(user: ChangeUserSettings) {
  const { data } = await axios.put(`${apiUrl}/change/${user.field}`, user);

  const { message } = data;
  const newValue = data[user.field];

  return { message, newValue };
}

export async function deleteAccount(id: string) {
  const { data } = await axios.delete(`${apiUrl}/delete/${id}`);

  const { message } = data;

  return { message };
}
