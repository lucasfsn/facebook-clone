import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}

export async function signup(user: SignUpData) {
  const { data } = await axios.post(`${apiUrl}/signup`, user);

  const { message, ...signUpData } = data;

  return { message, signUpData };
}

export interface LoginData {
  email: string;
  password: string;
}

export async function login(login: LoginData) {
  const { data } = await axios.post(`${apiUrl}/login`, login);

  const { message, ...loginData } = data;

  return { message, loginData };
}

export interface ChangePasswordData {
  email: string;
  password: string;
}

export async function changePassword(user: ChangePasswordData) {
  const { data } = await axios.post(`${apiUrl}/change-password`, user);

  const { message } = data;

  return { message };
}
