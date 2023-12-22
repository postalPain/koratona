import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ProductModel = types.model("Product").props({
  id: types.identifierNumber,
  name: types.optional(types.string, ""),
  description: types.optional(types.string, ""),
  outOfStock: types.optional(types.boolean, false),
  teamId: types.optional(types.number, 0),
  price: types.optional(types.string, ""),
  quantity: types.optional(types.number, 0),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  deletedAt: types.optional(types.maybeNull(types.string), ""),
  imageFilename: types.optional(types.maybeNull(types.string), ""),
  imageUrl: types.optional(types.maybeNull(types.string), ""),
})

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}

export const ProductPaginationMetaModel = types.model("PostsPaginationMeta").props({
  page: types.optional(types.number, 1),
  take: types.optional(types.number, 50),
  itemCount: types.optional(types.number, 0),
  pageCount: types.optional(types.number, 1),
  hasPreviousPage: types.optional(types.boolean, false),
  hasNextPage: types.optional(types.boolean, false),
})

export interface ProductPaginationMeta extends Instance<typeof ProductPaginationMetaModel> {}
