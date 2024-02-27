import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchPosts = () => {
  const { postsStore, teamStore } = useStores()

  useEffect(() => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    postsStore.fetchPosts(favoriteTeamIds)
  }, [])
}

export default useFetchPosts

export const useFetchFreshPosts = () => {
  const { postsStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    postsStore.fetchPosts(favoriteTeamIds)
  }
}

export const useFetchMorePosts = () => {
  const { postsStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    postsStore.fetchMorePosts(favoriteTeamIds)
  }
}
