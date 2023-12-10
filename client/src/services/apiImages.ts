import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export interface ImagesData {
  paths: string[];
  sort: "asc" | "desc";
}

export async function getImages(body: ImagesData) {
  const { data } = await axios.post(`${apiUrl}/image/getAll`, body);

  return data.resources;
}

export async function addImage(formData: FormData) {
  const { data } = await axios.post(`${apiUrl}/image/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { data };
}

export async function deleteImage(id: string) {
  const { data } = await axios.delete(`${apiUrl}/image/delete/${id}`);

  return { status: data.status };
}
