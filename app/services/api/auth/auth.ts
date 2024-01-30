import { ApiResponse } from "apisauce"
import { Alert } from "react-native"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as Auth from "./authTypes"

export const OTPLoginService = async (data: { phone: string }) => {
  try {
    const response = await api.apisauce.post(`auth/login`, data)

    if (!response.ok && response.problem === "CLIENT_ERROR") {
      Alert.alert("Something went wrong, please try again later")
    }
    return null
  } catch (e) {
    return { kind: "bad-data" }
  }
}
export const OTPLoginConfirmationService = async (data: {
  phone: string
  code: string
  deviceId: string
  skip?: boolean
}) => {
  try {
    const response: any = await api.apisauce.post(`auth/login-confirm-otp`, data)

    if (!response.ok) {
      return { kind: "bad-data", data: null, message: response.data?.message }
    }
    return { kind: "ok", data: response.data }
  } catch (e) {
    return { kind: "bad-data" }
  }
}

export const loginService: Auth.LoginService = async (credentials) => {
  let response = {} as ApiResponse<Auth.AuthLoginResponse, { statusCode: number; error: string }>
  try {
    response = await api.apisauce.post(`auth/login`, credentials)

    // the typical ways to die when calling an api
    if (!response.ok) {
      if (response.problem === "CLIENT_ERROR") {
        Alert.alert("Error", JSON.stringify(response.data?.error))
      }
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.ok) {
      const accessToken = response.data?.data?.accessToken

      if (!accessToken) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", token: accessToken }
    }
    return { kind: "bad-data" }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}

export const signUpService: Auth.SignUpService = async (signUpData) => {
  let response = {} as ApiResponse<Auth.AuthSignUpResponse>

  try {
    response = await api.apisauce.post(`auth/signup`, signUpData)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}

export const passwordRestoreService: Auth.RestorePasswordService = async (restorePasswordData) => {
  let response = {} as ApiResponse<Auth.RestorePasswordResponse>

  try {
    response = await api.apisauce.post(`auth/forgot-password`, restorePasswordData)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}
