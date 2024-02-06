import { Post } from "app/models/Posts/Post"
import { GeneralApiProblem } from "../apiProblem"

export type PostStatus = "Draft" | "Published" | "Archived"

export type PostsMeta = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type PostsResponse = {
  data: Post[]
  meta: PostsMeta
}

export type FetchPostsService = ({
  page,
  take,
  order,
}: {
  page?: number
  take?: number
  order?: "ASC" | "DESC"
}) => Promise<{ kind: "ok"; data: PostsResponse } | GeneralApiProblem>

export type FetchPostByIdService = (
  id: number,
) => Promise<{ kind: "ok"; data: Post } | GeneralApiProblem>

export type TogglePostFavoritePayload = {
  postId: number
  userId: string
  action: "add" | "remove"
}
export type TogglePostFavoriteService = ({
  action,
  postId,
  userId,
}: TogglePostFavoritePayload) => Promise<{ kind: "ok" } | GeneralApiProblem>
