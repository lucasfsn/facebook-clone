import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function addFriend(userId: string, friendId: string) {
  const { data } = await axios.post(`${apiUrl}/profile/${friendId}/add`, {
    userId,
  });

  return { message: data.message };
}

export async function removeFriend(userId: string, friendId: string) {
  const { data } = await axios.delete(`${apiUrl}/profile/${friendId}/remove`, {
    params: {
      userId,
    },
  });

  return { message: data.message };
}

export async function removeFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.delete(
    `${apiUrl}/profile/${friendId}/removeRequest`,
    {
      params: {
        userId,
      },
    },
  );

  return { message: data.message };
}

export async function acceptFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.put(`${apiUrl}/profile/${friendId}/accept`, {
    userId,
  });

  return { message: data.message };
}

export async function cancelFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.put(`${apiUrl}/profile/${friendId}/cancel`, {
    userId,
  });

  return { message: data.message };
}

export async function getUserById(id: string) {
  const { data } = await axios.get(`${apiUrl}/user/${id}`);

  return data;
}
