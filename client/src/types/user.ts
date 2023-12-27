import { LoginData, SignUpData } from "./auth";
import {
  ChangeEmailData,
  ChangeNameData,
  ChangePasswordData,
} from "./settings";

export interface SettingsChangePayload {
  field: keyof SingleUser;
  value: string;
}

export interface SingleUser {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type FormInputData = {
  [key: string]: string | number;
} & (
  | ChangePasswordData
  | ChangeNameData
  | ChangeEmailData
  | LoginData
  | SignUpData
);
