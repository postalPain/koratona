import { fetchTeamList } from "app/services/api/team/teamService"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { TeamModel } from "./Team"
import { ListPaginationMetaModel } from "../ListPaginationMetaModel"

export const TeamStoreModel = types
  .model("TeamStore")
  .props({
    teamList: types.optional(types.array(TeamModel), []),
    postsPaginationMeta: types.optional(ListPaginationMetaModel, {
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
        self.postsPaginationMeta = response.data.meta
      } catch (error) {
        self.isTeamListErrored = true
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isTeamListLoading = false
      }
    }),
  }))
// .views((self) => ({}))

export interface TeamStore extends Instance<typeof TeamStoreModel> {}
export interface TeamStoreSnapshot extends SnapshotOut<typeof TeamStoreModel> {}
export interface TeamStoreSnapshotIn extends SnapshotIn<typeof TeamStoreModel> {}
