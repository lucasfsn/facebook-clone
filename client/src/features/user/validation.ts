import * as Yup from "yup";

export const signUpValidation = () =>
  Yup.object({
    firstName: Yup.string()
      .required(`Please enter your first name.`)
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "First name cannot contain numbers and special characters.",
      ),
    lastName: Yup.string()
      .required(`Please enter your last name.`)
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "Last name cannot contain numbers and special characters.",
      ),
    email: Yup.string()
      .required(`Please enter your email.`)
      .email(`Email must be valid.`),
    password: Yup.string()
      .required(
        `Enter a combination of at least six numbers, letters and punctation marks (like ! and &).`,
      )
      .min(6, "Please enter at least 6 characters."),
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
