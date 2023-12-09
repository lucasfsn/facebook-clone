import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function getProfile(username: string) {
  const { data } = await axios.get(`${apiUrl}/profile/${username}`);

  return data;
}

export async function updateProfilePicture(userId: string, image: string) {
  const { data } = await axios.patch(`${apiUrl}/profile/updatePicture`, {
    userId,
    image,
  });

  return { res: data };
}
