import * as Yup from "yup";

export const signUpValidation = () =>
  Yup.object({
    firstName: Yup.string()
      .required(`Please enter your first name.`)
      .min(2, "First name must be at least 2 characters long.")
      .max(50, "First name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "First name cannot contain numbers and special characters.",
      ),
    lastName: Yup.string()
      .required(`Please enter your last name.`)
      .min(2, "Last name must be at least 2 characters long.")
      .max(50, "Last name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "Last name cannot contain numbers and special characters.",
      ),
    email: Yup.string()
      .required(`Please enter your email.`)
      .email(`Email must be valid.`)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be valid.",
      ),
    password: Yup.string()
      .required(`Please enter your password.`)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
      ),
    birthDay: Yup.number().required(`Please enter your birth day.`),
    birthMonth: Yup.number().required(`Please enter your birth month.`),
    birthYear: Yup.number().required(`Please enter your birth year.`),
    gender: Yup.string(),
  });

export const loginValidation = () =>
  Yup.object({
    email: Yup.string()
      .required(`Please enter your email.`)
      .email(`Email must be valid.`),
    password: Yup.string().required(`Please enter your password.`),
  });

export const changePasswordValidation = () =>
  Yup.object({
    password: Yup.string()
      .required(`Please enter your new password.`)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
      ),
    confirmPassword: Yup.string()
      .required(`Please confirm your new password.`)
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

export const changeNameValidation = () =>
  Yup.object({
    name: Yup.string()
      .required(`Please enter your new name.`)
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "Name cannot contain numbers and special characters.",
      ),
  });

export const changeEmailValidation = () =>
  Yup.object({
    email: Yup.string()
      .required(`Please enter your email.`)
      .email(`Email must be valid.`)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be valid.",
      ),
  });
