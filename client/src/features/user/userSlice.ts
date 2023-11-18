import Cookies from "js-cookie";

export interface UserState {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
}

type Action = { type: string; payload: Partial<UserState> };

export default function userReducer(
  state = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : null,
  action: Action,
) {
  switch (action.type) {
    case "user/login":
      return { ...state, ...action.payload };
    case "user/logout":
      return state;
    default:
      return state;
  }
}
