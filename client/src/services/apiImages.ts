import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface ImagesData {
  path: string;
  sort: "asc" | "desc";
}

export async function getImages(body: ImagesData) {
  const { data } = await axios.post(`${apiUrl}/image/getAll`, body);

  return data.resources;
}
