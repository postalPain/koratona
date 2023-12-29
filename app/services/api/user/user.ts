import { ApiResponse } from "apisauce"
import * as User from "./userTypes"
import { authApi } from "../api"
import { getGeneralApiProblem } from "../apiProblem"

export const updateUserSettings: User.UpdateUserService = async (id, payload) => {
  let response = {} as ApiResponse<User.UpdateUserResponse>

  try {
    response = await authApi.apisauce.patch(`users/${id}`, payload)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (!response.data) {
      return { kind: "bad-data" }
    }
    return { kind: "ok", data: response.data }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}

export const getAuthUser: User.GetAuthUserService = async () => {
  let response = {} as ApiResponse<User.GetAuthUserResponse>

  try {
    response = await authApi.apisauce.get(`users/me`)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (!response.data) {
      return { kind: "bad-data" }
    }
    const userData = response.data
    return { kind: "ok", data: userData }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}
