import { useStores } from "app/models"
import { useEffect } from "react"

export const useFetchAuthUser = () => {
  const {
    authUser: { fetchAuthUser, authUser, isLoading },
    authenticationStore: { isAuthenticated },
  } = useStores()

  useEffect(() => {
    if (isAuthenticated) {
      fetchAuthUser()
    }
  }, [isAuthenticated])

  return { authUser, isLoading }
}
