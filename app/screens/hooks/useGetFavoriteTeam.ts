import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchFavoriteTeam = () => {
  const { teamStore } = useStores()

  useEffect(() => {
    teamStore.getUserFavoriteTeam()
  }, [])
}

export default useFetchFavoriteTeam
