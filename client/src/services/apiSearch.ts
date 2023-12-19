import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function search(user: string) {
  const { data } = await axios.post(`${apiUrl}/search/${user}`);

  return { data };
}

export async function searchAdd(user: string, id: string) {
  const { data } = await axios.put(`${apiUrl}/search/${user}/add`, {
    id,
  });

  return { data };
}

export async function searchGet(id: string) {
  const { data } = await axios.get(`${apiUrl}/search/${id}/get`);

  return { data };
}

export async function serachDelete(user: string, id: string) {
  const { data } = await axios.delete(`${apiUrl}/search/${user}`, {
    params: {
      id,
    },
  });

  return { data };
}
