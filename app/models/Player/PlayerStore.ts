import {
  addPlayerToFavorite,
  fetchPlayerList,
  getUsersFavoritePlayerList,
  removePlayerFromFavorite,
} from "app/services/api/player/playerService"
import { Instance, SnapshotIn, SnapshotOut, clone, flow, getRoot, types } from "mobx-state-tree"
import { ListPaginationMetaModel } from "../ListPaginationMetaModel"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Player, PlayerModel } from "./Player"

export const PlayerStoreModel = types
  .model("TeamStore")
  .props({
    playerList: types.optional(types.array(PlayerModel), []),
    favoritePlayerList: types.optional(types.array(PlayerModel), []),
    paginationMeta: types.optional(ListPaginationMetaModel, {
      page: 1,
      take: 5,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    }),
    isPlayerListLoading: types.optional(types.boolean, false),
    isPlayerListErrored: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchPlayerList: flow(function* () {
      self.isPlayerListLoading = true
      self.isPlayerListErrored = false
      try {
        const response = yield fetchPlayerList({})

        self.playerList = response.data.data
        self.paginationMeta = response.data.meta
      } catch (error) {
        self.isPlayerListErrored = true
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isPlayerListLoading = false
      }
    }),
    togglePlayerFavorite: flow(function* (id: number, successCallback?: () => void) {
      self.isPlayerListLoading = true
      self.isPlayerListErrored = false
      try {
        const {
          authUserStore: { user },
        } = getRoot(self) as any
        if (
          self.favoritePlayerList.length > 0 &&
          self.favoritePlayerList.find((player) => player.id === id)
        ) {
          self.favoritePlayerList.replace(
            self.favoritePlayerList.filter((player) => player.id !== id),
          )
          yield removePlayerFromFavorite(id, user.userId)
        } else {
          const player = self.playerList.find((player) => player.id === id)
          if (player) {
            self.favoritePlayerList.push(clone(player))
          }
          yield addPlayerToFavorite(id, user.userId)
        }
        successCallback && successCallback()
      } catch (error) {
        console.log("adding to favorite, error", error)
        self.isPlayerListErrored = true
        console.tron.error?.(`Error adding team to favorite: ${JSON.stringify(error)}`, [])
      } finally {
        self.isPlayerListLoading = false
      }
    }),
    getUsersFavoritePlayersList: flow(function* () {
      try {
        const {
          authUserStore: { user },
        } = getRoot(self) as any


        const response = yield getUsersFavoritePlayerList(user.userId)
        const mappedData = response.data.data.filter(({ player }: { player: Player }) => !!player)
        .map(({ player }: { player: Player }) => player)
        self.favoritePlayerList = mappedData
      } catch (error) {
        console.tron.error?.(`Error fetching favorite team: ${JSON.stringify(error)}`, [])
      }
    }),
  }))
  .views((self) => ({
    isPlayerFavorited(id: number) {
      return (
        self.favoritePlayerList.length > 0 && !!self.favoritePlayerList.find((p) => p.id === id)
      )
    },
    getPlayerById(id: number) {
      return self.playerList.find((p) => p.id === id)
    },
  }))

export interface PlayerStore extends Instance<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshot extends SnapshotOut<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotIn extends SnapshotIn<typeof PlayerStoreModel> {}
