import * as yup from "yup"

/**
 * SignUp validation schema
 */

export const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/
export const signUpPasswordHintMessage =
  "The password should have 12 characters, lower and upper case, numbers and special characters."

export type SignUpValues = yup.InferType<typeof signUpValidationSchema>
export const signUpValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().matches(passwordRegEx, signUpPasswordHintMessage).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
})

/**
 * SignIn validation schema
 */

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

/**
 * ForgotPassword validation schema
 */

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
})
