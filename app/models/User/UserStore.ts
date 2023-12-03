import { getAuthUser, setUserSettings } from "app/services/api/auth/auth"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "./User"
import { saveString } from "app/utils/storage"

export const USER_SETTINGS_APPLIED_KEY = "userSettingsApplied"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    authUser: types.optional(UserModel, {}),
    isLoading: types.optional(types.boolean, false),
    isErrored: types.optional(types.boolean, false),
    notificationToken: types.optional(types.maybeNull(types.string), null),
    notificationPermissionAsked: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    initApplyUserSettings: flow(function* () {
      try {
        yield setUserSettings()
        saveString(USER_SETTINGS_APPLIED_KEY, "true")
      } catch (error) {
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      }
    }),
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
    setNotificationToken: (token: string | null) => {
      self.notificationToken = token
      self.notificationPermissionAsked = true
    },
  }))

export interface AuthUser extends Instance<typeof UserStoreModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
