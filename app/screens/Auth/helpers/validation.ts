import * as yup from "yup"

/**
 * SignUp validation schema
 */

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/
export const signUpPasswordHintMessage =
  "The password should have 12 characters, lower and upper case, numbers and special characters."

export type SignUpValues = yup.InferType<typeof signUpValidationSchema>
export const signUpValidationSchema = yup.object().shape({
  // firstName: yup.string().required(),
  lastName: yup.string().required(),
  // phone: yup.string().required("Phone number is required").typeError("Phone number is required"),
  email: yup.string().email().required(),
  password: yup.string().matches(passwordRegEx, signUpPasswordHintMessage).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
})
