import { useStores } from "app/models"
import { useEffect } from "react"

export const useFetchAuthUser = () => {
  const {
    authUserStore: { fetchAuthUser, user, isLoading },
    authenticationStore: { isAuthenticated },
  } = useStores()

  useEffect(() => {
    if (isAuthenticated) {
      fetchAuthUser()
    }
  }, [isAuthenticated])

  return { authUser: user, isLoading }
}
