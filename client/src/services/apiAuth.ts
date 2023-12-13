import axios from "axios";
import { Login, SignUp } from "../types/auth";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function signup(user: SignUp) {
  const { data } = await axios.post(`${apiUrl}/signup`, user);

  const { message, ...signUpData } = data;

  return { message, signUpData };
}

export async function login(login: Login) {
  const { data } = await axios.post(`${apiUrl}/login`, login);

  const { message, ...loginData } = data;

  return { message, loginData };
}
