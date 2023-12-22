import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./Auth/AuthenticationStore"
import { UserStoreModel } from "./User/UserStore"
import { PostsStoreModel } from "./Posts/PostsStore"
import { ProductsStoreModel } from "./Products/ProductsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  authUser: types.optional(UserStoreModel, {
    authUser: {
      firstName: "Unknown",
    },
  }),
  postsStore: types.optional(PostsStoreModel, {}),
  productsStore: types.optional(ProductsStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
