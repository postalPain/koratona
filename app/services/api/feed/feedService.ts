import { ApiResponse } from "apisauce"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as FeedTypes from "./feedTypes"
import { Post } from "../../../models/Posts/Post"

export const fetchPosts: FeedTypes.FetchPostsService = async ({
  page = 1,
  take = 50,
  order = "DESC",
}) => {
  let response = {} as ApiResponse<FeedTypes.PostsResponse>

  try {
    response = await api.apisauce.get(
      `post?order=${order}&page=${page}&take=${take}&status=published`,
    )

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

export const fetchPostById: FeedTypes.FetchPostByIdService = async (id) => {
  let response = {} as ApiResponse<Post>

  try {
    response = await api.apisauce.get(`post/${id}`)

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

export const toggleFavorite: FeedTypes.TogglePostFavoriteService = async ({
  postId,
  userId,
  action,
}) => {
  let response = {} as ApiResponse<Post>

  try {
    if (action === "remove") {
      response = await api.apisauce.delete(`user/favorite/post/${postId}`, {
        data: {
          userId,
        },
      })
    } else {
      response = await api.apisauce.post(`user/favorite/post/${postId}`, {
        userId,
      })
    }
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
