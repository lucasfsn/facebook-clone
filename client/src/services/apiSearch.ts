import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function search(user: string) {
  const { data } = await axios.post(`${apiUrl}/search/${user}`);

  return { data };
}
