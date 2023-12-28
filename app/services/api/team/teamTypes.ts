import { Team } from "app/models/Team/Team"
import { GeneralApiProblem } from "../apiProblem"

export type PostStatus = "Draft" | "Published" | "Archived"

export type TeamMeta = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type TeamListResponse = {
  data: Team[]
  meta: TeamMeta
}

export type FetchTeamListService = ({
  page,
  take,
  order,
}: {
  page?: number
  take?: number
  order?: "ASC" | "DESC"
}) => Promise<{ kind: "ok"; data: TeamListResponse } | GeneralApiProblem>

export type FetchTeamByIdService = (
  id: number,
) => Promise<{ kind: "ok"; data: Team } | GeneralApiProblem>
