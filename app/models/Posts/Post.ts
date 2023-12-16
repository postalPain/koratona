import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const PostModel = types.model("Post").props({
  id: types.identifierNumber,
  title: types.optional(types.string, ""),
  subtitle: types.optional(types.string, ""),
  status: types.enumeration("Status", ["Draft", "Published", "Archived"]),
  content: types.optional(types.maybeNull(types.string), ""),
  quiz: types.optional(types.maybeNull(types.string), ""),
  video: types.optional(types.maybeNull(types.string), ""),
  coverImageFilename: types.optional(types.maybeNull(types.string), ""),
  coverImageUrl: types.optional(types.maybeNull(types.string), ""),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  deletedAt: types.optional(types.maybeNull(types.string), ""),
})

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel> {}

export const PostsPaginationMetaModel = types.model("PostsPaginationMeta").props({
  page: types.optional(types.number, 1),
  take: types.optional(types.number, 50),
  itemCount: types.optional(types.number, 0),
  pageCount: types.optional(types.number, 1),
  hasPreviousPage: types.optional(types.boolean, false),
  hasNextPage: types.optional(types.boolean, false),
})

export interface PostsPaginationMeta extends Instance<typeof PostsPaginationMetaModel> {}
