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
