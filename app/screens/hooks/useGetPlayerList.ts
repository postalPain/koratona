import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchPlayerList = () => {
  const { playerStore, teamStore } = useStores()

  useEffect(() => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    playerStore.fetchPlayerList(favoriteTeamIds)
  }, [])
}

export default useFetchPlayerList

export const useFetchFreshPlayerList = () => {
  const { playerStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    playerStore.fetchPlayerList(favoriteTeamIds)
  }
}

export const useFetchMorePlayers = () => {
  const { playerStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    playerStore.fetchMorePlayers(favoriteTeamIds)
  }
}
