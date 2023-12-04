import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface ChangePasswordData {
  email: string;
  password: string;
}

export async function changePassword(user: ChangePasswordData) {
  const { data } = await axios.patch(`${apiUrl}/change-password`, user);

  const { message } = data;

  return { message };
}

type ChangeUserSettingsType = "firstName" | "lastName" | "email";

export interface ChangeUserSettingsData {
  email: string;
  field: ChangeUserSettingsType;
  value: string;
}

export async function changeSettings(user: ChangeUserSettingsData) {
  const { data } = await axios.put(`${apiUrl}/change/${user.field}`, user);
  console.log(data);

  const { message } = data;
  const newValue = data[user.field];

  return { message, newValue };
}
