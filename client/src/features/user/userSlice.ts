export interface UserState {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
}

interface UserAction {
  type: string;
  payload: Partial<UserState>;
}

const initialStateUser: UserState = {
  id: "",
  username: "",
  picture: "",
  firstName: "",
  lastName: "",
};

export default function userReducer(
  state = initialStateUser,
  action: UserAction,
): UserState {
  switch (action.type) {
    case "user/login":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
