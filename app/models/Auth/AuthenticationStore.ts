import { api } from "app/services/api"
import { OTPLoginConfirmationService, OTPLoginService } from "app/services/api/auth/auth"
import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { AuthUser } from "../User/User"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: types.maybe(types.string),
    showingOnboarding: types.optional(types.boolean, false),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((self) => ({
    setAuthToken(value?: string) {
      self.authToken = value
    },
    getOTPCode: flow(function* (phone: string, cb: () => void) {
      yield OTPLoginService({ phone })
      cb && cb()
    }),
    confirmOTPCode: flow(function* (
      confirmationData: {
        phone: string
        code: string
        deviceId: string | null
      },
      successCb?: (user: AuthUser) => void,
      unsuccessCb?: (message: string) => void,
    ) {
      const skipOTPCode = __DEV__ ? { skip: true } : {}
      const { data, kind, message } = yield OTPLoginConfirmationService({
        ...confirmationData,
        ...skipOTPCode,
      })

      if (kind === "bad-data") {
        Alert.alert(message || "Something went wrong, please try again later")
        unsuccessCb && unsuccessCb(message)
        return
      }

      self.authToken = data?.data?.accessToken
      self.showingOnboarding = data?.data?.onboarding
      api.apisauce.setHeader("Authorization", `Bearer ${data?.data?.accessToken}`)

      successCb && successCb(data?.data?.user)
    }),
    distributeAuthToken(value?: string) {
      // optionally grab the store's authToken if not passing a value
      const token = value || self.authToken
      api.apisauce.setHeader("Authorization", `Bearer ${token}`)
    },
    logout() {
      self.authToken = undefined
      self.authEmail = ""
    },
    setShowingOnboarding(value: boolean) {
      self.showingOnboarding = value
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
