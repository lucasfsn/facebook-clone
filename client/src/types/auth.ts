export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}

export interface Login {
  email: string;
  password: string;
}
