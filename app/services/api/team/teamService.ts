import { ApiResponse } from "apisauce"
import { Team } from "app/models/Team/Team"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as TeamServiceTypes from "./teamTypes"

export const fetchTeamList: TeamServiceTypes.FetchTeamListService = async ({
  page = 1,
  take = 50,
  order = "DESC",
}) => {
  let response = {} as ApiResponse<TeamServiceTypes.TeamListResponse>
  try {
    response = await api.apisauce.get(`team?order=${order}&page=${page}&take=${take}`)

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

export const fetchTeamById: TeamServiceTypes.FetchTeamByIdService = async (id) => {
  let response = {} as ApiResponse<Team>

  try {
    response = await api.apisauce.get(`team/${id}`)

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
