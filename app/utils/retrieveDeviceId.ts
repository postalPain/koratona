import * as SecureStore from "expo-secure-store"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

const SECURE_DEVICE_ID = "secure_device_id"

export const retrieveDeviceId = async () => {
  const existingDeviceId = await SecureStore.getItemAsync(SECURE_DEVICE_ID)

  // if user has already signed up prior
  if (existingDeviceId) {
    return existingDeviceId
  }
  const uuid = uuidv4()
  SecureStore.setItemAsync(SECURE_DEVICE_ID, uuid).then(() => {
    return uuid
  })

  return uuid
}
