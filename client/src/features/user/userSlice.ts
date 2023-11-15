import Cookies from "js-cookie";

export interface UserState {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
}

const initialStateUser = {
  id: "",
  username: "",
  picture: "",
  firstName: "",
  lastName: "",
};

type Action = { type: string; payload: Partial<UserState> };

export default function userReducer(
  state: UserState = JSON.parse(
    Cookies.get("user") ?? JSON.stringify(initialStateUser),
  ),
  action: Action,
): UserState {
  switch (action.type) {
    case "user/login":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
