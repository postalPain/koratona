import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchFavoritePlayerList = () => {
  const { playerStore } = useStores()

  useEffect(() => {
    playerStore.getUsersFavoritePlayersList()
  }, [])
}

export default useFetchFavoritePlayerList
