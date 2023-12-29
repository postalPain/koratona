import { USER_SETTINGS_APPLIED_KEY, useStores } from "app/models"
import { loadString } from "app/utils/storage"
import { useEffect } from "react"

export const useInitApplyUserSettings = () => {
  const {
    authUserStore: { initApplyUserSettings },
    authenticationStore: { isAuthenticated },
  } = useStores()

  useEffect(() => {
    if (isAuthenticated) {
      loadString(USER_SETTINGS_APPLIED_KEY).then((userSettingsApplied) => {
        if (userSettingsApplied !== "true") {
          initApplyUserSettings()
        }
      })
    }
  }, [isAuthenticated])
}
