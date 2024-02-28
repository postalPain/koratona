import { Player } from "app/models/Player/Player"
import { GeneralApiProblem } from "../apiProblem"

export type PlayerMeta = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type PlayerListResponse = {
  data: Player[]
  meta: PlayerMeta
}

export type FetchPlayerListService = ({
  page,
  take,
  order,
}: {
  page?: number
  take?: number
  order?: "ASC" | "DESC"
  teamIds?: number[]
}) => Promise<{ kind: "ok"; data: PlayerListResponse } | GeneralApiProblem>

export type FetchPlayerByIdService = (
  id: number,
) => Promise<{ kind: "ok"; data: Player } | GeneralApiProblem>

export type FavoritePlayer = {
  userId: string
  playerId: number
  createdAt: string
  player: Player
}

export type GetUserFavoritePlayersListService = (userId: string) => Promise<
  | {
      kind: "ok"
      data: FavoritePlayer
    }
  | GeneralApiProblem
>

export type AddPlayerToFavoriteService = (
  id: number,
  userId: string,
) => Promise<
  | {
      kind: "ok"
      data: FavoritePlayer
    }
  | GeneralApiProblem
>

export type RemovePlayerFromFavoriteService = (
  id: number,
  userId: string,
) => Promise<
  | {
      kind: "ok"
      data: FavoritePlayer
    }
  | GeneralApiProblem
>
