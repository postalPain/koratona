import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchProducts = () => {
  const { productsStore } = useStores()

  useEffect(() => {
    productsStore.fetchProducts()
  }, [])
}

export default useFetchProducts
