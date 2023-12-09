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

export async function updateCover(userId: string, image: string) {
  const { data } = await axios.patch(`${apiUrl}/profile/updateCover`, {
    userId,
    image,
  });

  return { res: data };
}

export async function removeCoverPhoto(userId: string) {
  const { data } = await axios.delete(
    `${apiUrl}/profile/${userId}/removeCover`,
  );

  return { message: data.message };
}
