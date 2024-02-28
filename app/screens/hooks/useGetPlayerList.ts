import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchPlayerList = () => {
  const { playerStore, teamStore } = useStores()

  useEffect(() => {
    const favoriteTeamId = teamStore.selectedFavoriteTeam?.id

    playerStore.fetchPlayerList(favoriteTeamId)
  }, [])
}

export default useFetchPlayerList

export const useFetchFreshPlayerList = () => {
  const { playerStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.selectedFavoriteTeam?.id

    playerStore.fetchPlayerList(favoriteTeamIds)
  }
}

export const useFetchMorePlayers = () => {
  const { playerStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.selectedFavoriteTeam?.id


    playerStore.fetchMorePlayers(favoriteTeamIds)
  }
}
