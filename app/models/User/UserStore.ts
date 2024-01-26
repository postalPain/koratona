import { setUserSettings } from "app/services/api/auth/auth"
import {} from "app/services/api/auth/authTypes"
import { saveString } from "app/utils/storage"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "./User"
import { getAuthUser, updateUser } from "app/services/api/user/user"
import { UpdateUserPayloadData } from "app/services/api/user/userTypes"
import { showToast } from "app/utils/showToast"

export const USER_SETTINGS_APPLIED_KEY = "userSettingsApplied"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {
      createdAt: "",
      dateOfBirth: null,
      deletedAt: null,
      deviceId: "",
      email: null,
      firstName: null,
      lastName: null,
      jerseyNumber: 1,
      lang: "",
      phone: "",
      role: "",
      updatedAt: "",
      userId: "",
    }),
    isLoading: types.optional(types.boolean, false),
    isErrored: types.optional(types.boolean, false),
    notificationToken: types.optional(types.maybeNull(types.string), null),
    notificationPermissionAsked: types.optional(types.boolean, false),
    isOnboardingCompleted: types.optional(types.maybeNull(types.string), null),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    initApplyUserSettings: flow(function* () {
      try {
        yield setUserSettings()
        saveString(USER_SETTINGS_APPLIED_KEY, "true")
      } catch (error) {
        console.tron.error?.(`Error applying settings authUser: ${JSON.stringify(error)}`, [])
      }
    }),
    fetchAuthUser: flow(function* () {
      self.isLoading = true
      self.isErrored = false
      try {
        const response = yield getAuthUser()
        self.user = response.data
      } catch (error) {
        self.isErrored = true
        console.tron.error?.(`Error fetching authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isLoading = false
      }
    }),
    updateUser: flow(function* (user: UpdateUserPayloadData, successCallback?: () => void) {
      self.isLoading = true
      self.isErrored = false
      try {
        const response = yield updateUser({ ...user, userId: self.user.userId })
        if(response.kind === "bad-data") {
          showToast("Error updating user, please try again later")
          return
        }
        self.user = { ...self.user, ...response.data }
        successCallback && successCallback()
      } catch (error) {
        self.isErrored = true
        showToast("Error updating user, please try again later")
        console.tron.error?.(`Error updating authUser: ${JSON.stringify(error)}`, [])
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
