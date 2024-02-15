import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const userWhoFavoritedPost = types.model("userWhoFavoritedPost").props({
  userId: types.identifier,
  postId: types.optional(types.number, 0),
  createdAt: types.optional(types.string, ""),
})

export const PostModel = types.model("Post").props({
  id: types.identifierNumber,
  title: types.optional(types.string, ""),
  subtitle: types.optional(types.string, ""),
  titleAr: types.optional(types.maybeNull(types.string), ""),
  subtitleAr: types.optional(types.maybeNull(types.string), ""),
  status: types.enumeration("Status", ["Draft", "Published", "Archived"]),
  content: types.maybeNull(types.string),
  contentAr: types.maybeNull(types.string),
  quiz: types.optional(types.maybeNull(types.string), ""),
  quizAr: types.optional(types.maybeNull(types.string), ""),
  video: types.optional(types.maybeNull(types.string), ""),
  coverImageFilename: types.optional(types.maybeNull(types.string), ""),
  coverImageUrl: types.optional(types.maybeNull(types.string), ""),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  deletedAt: types.optional(types.maybeNull(types.string), ""),
  usersToFavoritePosts: types.optional(types.array(userWhoFavoritedPost), []),
  favoriteCount: types.optional(types.number, 0),
})

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel> {}
