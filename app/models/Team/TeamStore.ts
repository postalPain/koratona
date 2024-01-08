import {
  addTeamToFavorite,
  fetchTeamList,
  getUsersFavoriteTeamList,
  removeTeamFromFavorite,
} from "app/services/api/team/teamService"
import { Instance, SnapshotIn, SnapshotOut, detach, flow, getRoot, isAlive, types } from "mobx-state-tree"
import { ListPaginationMetaModel } from "../ListPaginationMetaModel"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Team, TeamModel } from "./Team"
import { showToast } from "app/utils/showToast"

export const TeamStoreModel = types
  .model("TeamStore")
  .props({
    teamList: types.optional(types.array(TeamModel), []),
    favoriteTeam: types.optional(TeamModel, {
      id: 0,
      apiId: 0,
      name: "",
      description: "",
      logoFilename: "",
      logoUrl: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    }),
    paginationMeta: types.optional(ListPaginationMetaModel, {
      page: 1,
      take: 5,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    }),
    isTeamListLoading: types.optional(types.boolean, false),
    isTeamListErrored: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchTeamList: flow(function* () {
      self.isTeamListLoading = true
      self.isTeamListErrored = false
      try {
        const response = yield fetchTeamList({})

        self.teamList = response.data.data
        self.paginationMeta = response.data.meta
      } catch (error) {
        self.isTeamListErrored = true
        showToast("Error fetching team list")
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isTeamListLoading = false
      }
    }),
    addTeamToFavorite: flow(function* (id: number, successCallback?: () => void) {
      self.isTeamListLoading = true
      self.isTeamListErrored = false
      try {
        const {
          authUserStore: { user },
        } = getRoot(self) as any
        if (self.favoriteTeam.id !== 0) {
          yield removeTeamFromFavorite(self.favoriteTeam.id, user.id)
        }
        const response = yield addTeamToFavorite(id, user.id)
        detach(self.favoriteTeam)
        self.favoriteTeam = response.data.team
        successCallback && successCallback()
      } catch (error) {
        showToast("Error adding team to favorite")
        self.isTeamListErrored = true
        console.tron.error?.(`Error adding team to favorite: ${JSON.stringify(error)}`, [])
      } finally {
        self.isTeamListLoading = false
      }
    }),
    getUserFavoriteTeam: flow(function* () {
      try {
        const {
          authUserStore: { user },
        } = getRoot(self) as any
        if (!isAlive(user)) {
          return
        }
        const response = yield getUsersFavoriteTeamList(user.id)
        const mappedData = response.data.data.map(({ team }: { team: Team }) => team)
        detach(self.favoriteTeam)
        self.favoriteTeam = mappedData[0]
      } catch (error) {
        showToast("Error fetching favorite team list")
        console.tron.error?.(`Error fetching favorite team: ${JSON.stringify(error)}`, [])
      }
    }),
  }))
  .views((self) => ({
    get selectedFavoriteTeam() {
      return self.favoriteTeam
    },
  }))

export interface TeamStore extends Instance<typeof TeamStoreModel> {}
export interface TeamStoreSnapshot extends SnapshotOut<typeof TeamStoreModel> {}
export interface TeamStoreSnapshotIn extends SnapshotIn<typeof TeamStoreModel> {}
