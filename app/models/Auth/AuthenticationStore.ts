import { api } from "app/services/api"
import { OTPLoginConfirmationService, OTPLoginService } from "app/services/api/auth/auth"
import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { Alert } from "react-native"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: types.maybe(types.string),
    onboarding: types.optional(types.boolean, false),
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
    getOTACode: flow(function* (phone: string, cb: () => void) {
      yield OTPLoginService({ phone })

      cb && cb()
    }),
    confirmOTPCode: flow(function* (
      confirmationData: {
        phone: string
        code: string
        deviceId: string
      },
      successCb?: () => void,
      unsuccessCb?: (message: string) => void,
    ) {
      const { data, kind, message } = yield OTPLoginConfirmationService(confirmationData)
      if (kind === "bad-data") {
        Alert.alert(message || "Something went wrong, please try again later")
        unsuccessCb && unsuccessCb(message)
        return
      }

      self.authToken = data?.data?.accessToken
      api.apisauce.setHeader("Authorization", `Bearer ${data?.data?.accessToken}`)

      successCb && successCb()
    }),
    distributeAuthToken(value?: string) {
      // optionally grab the store's authToken if not passing a value
      const token = value || self.authToken
      api.apisauce.setHeader("Authorization", `Bearer ${token}`)
    },
    setAuthEmail(value: string) {
      self.authEmail = value.replace(/ /g, "")
    },
    logout() {
      self.authToken = undefined
      self.authEmail = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
