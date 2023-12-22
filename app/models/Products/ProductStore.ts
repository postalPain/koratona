import { fetchPostById, fetchPosts } from "app/services/api/feed/feedService"
import { PostsResponse } from "app/services/api/feed/feedTypes"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { ProductModel, ProductPaginationMetaModel } from "./Product"

export const PostsStoreModel = types
  .model("PostsStore")
  .props({
    product: types.optional(types.array(ProductModel), []),
    productPaginationMeta: types.optional(ProductPaginationMetaModel, {
      page: 1,
      take: 5,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    }),
    isFetchingProducts: types.optional(types.boolean, false),
    isFetchingMoreProducts: types.optional(types.boolean, false),
    isFetchingProductsErrored: types.optional(types.boolean, false),
    isFetchingProductById: types.optional(types.boolean, false),
    isFetchingProductByIdErrored: types.optional(types.boolean, false),
    openedProductDetails: types.optional(types.maybeNull(ProductModel), null),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchPosts: flow(function* () {
      self.isFetchingProducts = true
      self.isFetchingProductsErrored = false
      try {
        const response = yield fetchPosts({ take: self.productPaginationMeta.take })
        self.product = response?.data?.data
        self.productPaginationMeta = response?.data?.meta
      } catch (error) {
        self.isFetchingProductsErrored = true
        console.log("Error fetching posts: ", error)
        console.tron.error?.(`Error fetching posts: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingProducts = false
      }
    }),
    fetchMorePosts: flow(function* () {
      self.isFetchingMoreProducts = true
      self.isFetchingProductsErrored = false
      try {
        if (!self.productPaginationMeta.hasNextPage) {
          return
        }
        let nextPage = self.productPaginationMeta.page
        if (self.productPaginationMeta.page < self.productPaginationMeta.pageCount) {
          nextPage++
        }

        const { data: response }: { data: PostsResponse } = yield fetchPosts({
          page: nextPage,
          take: self.productPaginationMeta.take,
        })
        const validatedPosts = response.data.map((postData) => ProductModel.create(postData))
        self.product.push(...validatedPosts)
        self.productPaginationMeta = response.meta
      } catch (error) {
        self.isFetchingProductsErrored = true
        console.log("Error fetching posts more: ", error)
        console.tron.error?.(`Error fetching more posts: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingMoreProducts = false
      }
    }),
    fetchPostById: flow(function* (id: number) {
      self.isFetchingProductById = true
      self.isFetchingProductByIdErrored = false
      try {
        const response = yield fetchPostById(id)
        self.openedProductDetails = response.data.data
      } catch (error) {
        self.isFetchingProductByIdErrored = true
        console.log("Error fetching post by id: ", error)
        console.tron.error?.(`Error fetching post by id: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingProductById = false
      }
    }),
  }))
  .views((self) => ({
    get getProductById() {
      return (id: number) => self.product.find((product) => product.id.toString() === id.toString())
    },
  }))

export interface PostStore extends Instance<typeof PostsStoreModel> {}
export interface PostStoreSnapshotOut extends SnapshotOut<typeof PostsStoreModel> {}
export interface PostStoreSnapshotIn extends SnapshotIn<typeof PostsStoreModel> {}
