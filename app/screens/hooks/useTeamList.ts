import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchTeamList = () => {
  const { teamStore } = useStores()

  useEffect(() => {
    teamStore.fetchTeamList()
  }, [])
}

export default useFetchTeamList
