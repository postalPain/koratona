import { Team } from "app/models/Team/Team"
import { GeneralApiProblem } from "../apiProblem"
import { FavoriteTeam } from "app/models/Team/FavoriteTeam"

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

export type GetUserFavoriteTeamService = (userId: string) => Promise<
  | {
      kind: "ok"
      data: FavoriteTeam
    }
  | GeneralApiProblem
>

export type AddTeamToFavoriteService = (
  id: number,
  userId: string,
) => Promise<
  | {
      kind: "ok"
      data: FavoriteTeam
    }
  | GeneralApiProblem
>

export type RemoveTeamFromFavoriteService = (
  id: number,
  userId: string,
) => Promise<
  | {
      kind: "ok"
      data: FavoriteTeam
    }
  | GeneralApiProblem
>

export type UpdateFavoriteTeamsService = (
  ids: number[],
  userId: string,
) => Promise<
  | {
  kind: "ok"
  // data: FavoriteTeam
}
  | GeneralApiProblem
>
