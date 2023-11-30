import { getAuthUser } from "app/services/api/auth/auth"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "./User"

export const AuthInfoStoreModel = types
  .model("AuthInfoStore")
  .props({
    authUser: types.optional(UserModel, {}),
    isLoading: types.optional(types.boolean, false),
    isErrored: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchAuthUser: flow(function* () {
      self.isLoading = true
      self.isErrored = false
      try {
        const response = yield getAuthUser()
        self.authUser = response.data
      } catch (error) {
        self.isErrored = true
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isLoading = false
      }
    }),
  }))

export interface AuthUser extends Instance<typeof AuthInfoStoreModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof AuthInfoStoreModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof AuthInfoStoreModel> {}
