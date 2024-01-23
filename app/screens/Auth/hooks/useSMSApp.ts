import { useEffect, useState } from "react"
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native"

// @ts-ignore
import { requestReadSMSPermission, startReadSMS } from "@maniac-tech/react-native-expo-read-sms"

const useApp = () => {
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState<null | boolean>(null)
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState<null | boolean>(null)
  const [smsPermissionState, setSmsPermissionState] = useState<null | string>(null)
  const [successCallbackStatus, setSuccessCallbackStatus] = useState<null | string>(null)
  const [errorCallbackStatus, setErrorCallbackStatus] = useState<null | string>(null)
  const [smsMessageData, setSmsMessageData] = useState<string | null>(null)
  const [smsMessageNumber, setSmsMessageNumber] = useState<null | string>(null)
  const [smsMessageBody, setSmsMessageBody] = useState<null | string>(null)
  const [smsError, setSMSError] = useState<null | string>(null)

  const buttonClickHandler = () => {
    console.log("buttonClickHandler started sms receiving")

    startReadSMS(callbackFn1, callbackFn2)
  }

  const callbackFn1 = (status: string, sms: string, error: string) => {
    setSmsPermissionState("Success Callback!")

    if (status === "Start Read SMS successfully") {
      setSuccessCallbackStatus("Start Read SMS successfully")
      setSmsMessageData(sms)
    } else if (status === "success") {
      setSuccessCallbackStatus("just success")
      setSmsMessageData(sms)
    } else {
      setSuccessCallbackStatus("Error in success callback")
      setSMSError(error)
    }
  }

  const callbackFn2 = () => {
    setSmsPermissionState("Error Callback!")
    setErrorCallbackStatus("Start Read SMS failed")
  }

  const checkPermissions = async () => {
    if (Platform.OS === "ios") return
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    )
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    )

    if (!customHasReceiveSMSPermission || !customHasReadSMSPermission) {
      console.log("requesting permissions")

      await requestReadSMSPermission()
    }

    setHasReceiveSMSPermission(customHasReceiveSMSPermission)
    setHasReadSMSPermission(customHasReadSMSPermission)
  }

  useEffect(() => {
    const tempArray = (smsMessageData || "")
      ?.substring(1, (smsMessageData || "").length - 1)
      .split(",")

    if (smsMessageData) {
      const messageOriginatingAdd = tempArray[0]
      const messageBody = tempArray[1]

      setSmsMessageBody(messageBody)
      setSmsMessageNumber(messageOriginatingAdd)
    } else {
      setSmsMessageBody(null)
      setSmsMessageNumber(null)
    }
  }, [smsMessageData])

  useEffect(() => {
    checkPermissions()
  }, [])

  return {
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsMessageBody,
    smsMessageNumber,
    smsError,
  }
}

export default useApp
