import { ApiResponse } from "apisauce"
import * as User from "./userTypes"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import { showToast } from "app/utils/showToast"

export const updateUser: User.UpdateUserService = async (payload) => {
  let response = {} as ApiResponse<User.UpdateUserResponse>

  try {
    response = await api.apisauce.post("user/update", payload)
    // the typical ways to die when calling an api
    if (!response.ok) {
      console.tron.error?.(`Error updating authUser: ${response}`, [])

      showToast("Error updating user, please try again later")
      throw new Error("Error updating user")
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
    response = await api.apisauce.get(`user/me`)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      showToast("Error fetching user, please try again later")
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
