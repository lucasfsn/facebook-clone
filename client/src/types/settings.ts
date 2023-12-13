export interface ChangeNameData {
  [key: string]: string;
  name: string;
}

export interface ChangeEmailData {
  [key: string]: string;
  email: string;
}

export interface ChangePasswordData {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export type FormInputData = {
  [key: string]: string;
} & (ChangePasswordData | ChangeNameData | ChangeEmailData);

export interface ChangePassword {
  email: string;
  password: string;
}

export type ChangeUserSettingsType = "firstName" | "lastName" | "email";

export interface ChangeUserSettings {
  email: string;
  field: ChangeUserSettingsType;
  value: string;
}
