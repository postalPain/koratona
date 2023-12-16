import { getAuthUser, setUserSettings, updateUserSettings } from "app/services/api/auth/auth"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "./User"
import { saveString } from "app/utils/storage"
import { UpdateUserPayloadData } from "app/services/api/auth/authTypes"
import { navigate } from "app/navigators/navigationUtilities"

export const USER_SETTINGS_APPLIED_KEY = "userSettingsApplied"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    authUser: types.optional(UserModel, {}),
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
    updateUser: flow(function* (user: UpdateUserPayloadData) {
      self.isLoading = true
      self.isErrored = false
      try {
        const response = yield updateUserSettings(self.authUser.id, user)
        self.authUser = { ...self.authUser, ...response.data }
        self.isOnboardingCompleted = `${self.authUser.email}_done`
        navigate('Home', { screen: "FeedNavigator" })
      } catch (error) {
        self.isErrored = true
        console.tron.error?.(`Error updating authUser: ${JSON.stringify(error)}`, [])
      } finally {
        self.isLoading = false
      }
    }),
    setNotificationToken: (token: string | null) => {
      self.notificationToken = token
      self.notificationPermissionAsked = true
    },
    setOnboardingCompleted: () => {
      self.isOnboardingCompleted = `${self.authUser.email}_done`
    },
  }))
  .views((self) => ({
    get isUserOnboardingCompleted() {
      return self.isOnboardingCompleted === `${self.authUser.email}_done`
    },
  }))

export interface AuthUser extends Instance<typeof UserStoreModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
