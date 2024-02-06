import { fetchPostById, fetchPosts, toggleFavorite } from "app/services/api/feed/feedService"
import { PostsResponse } from "app/services/api/feed/feedTypes"
import { Instance, SnapshotIn, SnapshotOut, flow, getRoot, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PostModel } from "./Post"
import { ListPaginationMetaModel } from "../ListPaginationMetaModel"

export const PostsStoreModel = types
  .model("PostsStore")
  .props({
    posts: types.optional(types.array(PostModel), []),
    postsPaginationMeta: types.optional(ListPaginationMetaModel, {
      page: 1,
      take: 5,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    }),
    isFetchingPosts: types.optional(types.boolean, false),
    isFetchingMorePosts: types.optional(types.boolean, false),
    isFetchingPostsErrored: types.optional(types.boolean, false),
    isFetchingPost: types.optional(types.boolean, false),
    isFetchingPostErrored: types.optional(types.boolean, false),
    openedPostDetails: types.optional(types.maybeNull(PostModel), null),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchPosts: flow(function* () {
      self.isFetchingPosts = true
      self.isFetchingPostsErrored = false
      try {
        const response = yield fetchPosts({ take: self.postsPaginationMeta.take })
        self.posts = response?.data?.data
        self.postsPaginationMeta = response?.data?.meta
      } catch (error) {
        self.isFetchingPostsErrored = true
        console.tron.error?.(`Error fetching posts: ${error}`, [])
      } finally {
        self.isFetchingPosts = false
      }
    }),
    fetchMorePosts: flow(function* () {
      self.isFetchingMorePosts = true
      self.isFetchingPostsErrored = false
      try {
        if (!self.postsPaginationMeta.hasNextPage) {
          return
        }
        let nextPage = self.postsPaginationMeta.page
        if (self.postsPaginationMeta.page < self.postsPaginationMeta.pageCount) {
          nextPage++
        }

        const { data: response }: { data: PostsResponse } = yield fetchPosts({
          page: nextPage,
          take: self.postsPaginationMeta.take,
        })
        const validatedPosts = response.data.map((postData) => PostModel.create(postData))
        self.posts.push(...validatedPosts)
        self.postsPaginationMeta = response.meta
      } catch (error) {
        self.isFetchingPostsErrored = true
        console.log("Error fetching posts more: ", error)
        console.tron.error?.(`Error fetching more posts: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingMorePosts = false
      }
    }),
    fetchPostById: flow(function* (id: number) {
      self.isFetchingPost = true
      self.isFetchingPostErrored = false
      try {
        const response = yield fetchPostById(id)
        self.openedPostDetails = response.data
      } catch (error) {
        self.isFetchingPostErrored = true
        console.log("Error fetching post by id: ", error)
        console.tron.error?.(`Error fetching post by id: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingPost = false
      }
    }),
    toggleFavorite: flow(function* (postId: number) {
      try {
        const {
          authUserStore: { user },
        } = getRoot(self) as any
        const post = self.posts.find((post) => post.id === postId)
        if (post) {
          const updatedPostFavoriteInfo = {
            userId: user.userId,
            name: user.name,
            email: user.email,
          }
          const ifPostWasAlreadyFavorited = post.usersToFavoritePosts.find(
            ({ userId }) => userId === user.userId,
          )
          if (ifPostWasAlreadyFavorited) {
            post.usersToFavoritePosts = post.usersToFavoritePosts.filter(
              ({ userId }) => userId !== user.userId,
            ) as any
            post.favoriteCount--
          } else {
            post.usersToFavoritePosts.push(updatedPostFavoriteInfo)
            post.favoriteCount++
          }
          yield toggleFavorite({
            postId,
            userId: user.userId,
            action: ifPostWasAlreadyFavorited ? "remove" : "add",
          })
        }
      } catch (error) {
        console.log("Error adding post to favorite: ", error)
        console.tron.error?.(`Error adding post to favorite: ${JSON.stringify(error)}`, [])
      }
    }),
  }))
  .views((self) => ({
    get postsCount() {
      return self.posts.length
    },
    get getPostById() {
      return (id: number) => {
        if (self.openedPostDetails && self.openedPostDetails.id === id) {
          return self.openedPostDetails
        }
        return self.posts.find((post) => post.id.toString() === id.toString())
      }
    },
  }))

export interface PostStore extends Instance<typeof PostsStoreModel> {}
export interface PostStoreSnapshotOut extends SnapshotOut<typeof PostsStoreModel> {}
export interface PostStoreSnapshotIn extends SnapshotIn<typeof PostsStoreModel> {}
