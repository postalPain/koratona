import { ApiResponse } from "apisauce"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as PlayerServiceTypes from "./playerTypes"

export const fetchPlayerList: PlayerServiceTypes.FetchPlayerListService = async ({
  page = 1,
  take = 50,
  order = "ASC",
  teamIds = [],
}) => {
  let response = {} as ApiResponse<PlayerServiceTypes.PlayerListResponse>
  try {
    let query = `player?order=${order}&page=${page}&take=${take}`
    teamIds?.forEach((id) => {
      const newQuery = (query += `&teamIds=${id}`)
      return newQuery
    })
    response = await api.apisauce.get(query)

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

export const getUsersFavoritePlayerList: PlayerServiceTypes.GetUserFavoritePlayersListService =
  async (userId) => {
    let response = {} as ApiResponse<PlayerServiceTypes.FavoritePlayer>
    const TAKE = 50
    const PAGE = 1
    const ORDER = "ASC"
    try {
      response = await api.apisauce.get(
        `user/favorite/player?order=${ORDER}&page=${PAGE}&take=${TAKE}&userId=${userId}`,
      )
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

export const addPlayerToFavorite: PlayerServiceTypes.AddPlayerToFavoriteService = async (
  id,
  userId,
) => {
  let response = {} as ApiResponse<PlayerServiceTypes.FavoritePlayer>

  try {
    response = await api.apisauce.post(`user/favorite/player/${id}`, { userId })

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

export const removePlayerFromFavorite: PlayerServiceTypes.RemovePlayerFromFavoriteService = async (
  id,
  userId,
) => {
  let response = {} as ApiResponse<PlayerServiceTypes.FavoritePlayer>

  try {
    response = await api.apisauce.delete(`user/favorite/player/${id}`, { userId })

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
