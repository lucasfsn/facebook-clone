import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function getProfile(username: string) {
  const { data } = await axios.get(`${apiUrl}/profile/${username}`);

  return data;
}
