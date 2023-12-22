import { useStores } from "app/models"
import { useEffect } from "react"

const useFetchPosts = () => {
  const { postsStore } = useStores()

  useEffect(() => {
    postsStore.fetchPosts()
  }, [])
}

export default useFetchPosts
