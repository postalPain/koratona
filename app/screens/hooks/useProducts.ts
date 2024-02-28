import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchProducts = () => {
  const { productsStore, teamStore } = useStores()

  useEffect(() => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    productsStore.fetchProducts(favoriteTeamIds)
  }, [])
}

export default useFetchProducts

export const useFetchFreshProducts = () => {
  const { productsStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    productsStore.fetchProducts(favoriteTeamIds)
  }
}

export const useFetchMoreProducts = () => {
  const { productsStore, teamStore } = useStores()

  return () => {
    const favoriteTeamIds = teamStore.allSelectedFavoriteTeams.map((team) => team.id)

    productsStore.fetchMoreProducts(favoriteTeamIds)
  }
}
