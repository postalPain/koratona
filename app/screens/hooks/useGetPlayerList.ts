import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchPlayerList = () => {
  const { playerStore } = useStores()

  useEffect(() => {
    playerStore.fetchPlayerList()
  }, [])
}

export default useFetchPlayerList
