import { Store, combineReducers, createStore } from "redux";
import userReducer, { UserState } from "./features/user/userSlice";

interface RootState {
  user: UserState;
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;
