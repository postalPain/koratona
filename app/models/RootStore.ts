import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./Auth/AuthenticationStore"
import { PlayerStoreModel } from "./Player/PlayerStore"
import { PostsStoreModel } from "./Posts/PostsStore"
import { ProductsStoreModel } from "./Products/ProductsStore"
import { TeamStoreModel } from "./Team/TeamStore"
import { UserStoreModel } from "./User/UserStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  authUserStore: types.optional(UserStoreModel, {}),
  postsStore: types.optional(PostsStoreModel, {}),
  productsStore: types.optional(ProductsStoreModel, {}),
  teamStore: types.optional(TeamStoreModel, {}),
  playerStore: types.optional(PlayerStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
