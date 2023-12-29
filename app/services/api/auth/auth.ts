import { ApiResponse } from "apisauce"
import { Alert } from "react-native"
import { authApi } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as Auth from "./authTypes"

export const loginService: Auth.LoginService = async (credentials) => {
  let response = {} as ApiResponse<Auth.AuthLoginResponse, { statusCode: number; error: string }>
  try {
    response = await authApi.apisauce.post(`auth/login`, credentials)

    // the typical ways to die when calling an api
    if (!response.ok) {
      Alert.alert("Error", JSON.stringify(response.data?.error))
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
    response = await authApi.apisauce.post(`auth/signup`, signUpData)

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
    response = await authApi.apisauce.post(`auth/forgot-password`, restorePasswordData)

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

export const setUserSettings: Auth.ApplyUserSettingsService = async () => {
  let response = {} as ApiResponse<Auth.GetAuthUserResponse>

  try {
    response = await authApi.apisauce.post(`auth/settings`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (!response.data) {
      return { kind: "bad-data" }
    }
    return { kind: "ok" }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}
