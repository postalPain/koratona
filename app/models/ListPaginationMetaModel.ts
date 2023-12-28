import { Instance, types } from "mobx-state-tree";

export const ListPaginationMetaModel = types.model("ListPaginationMeta").props({
  page: types.optional(types.number, 1),
  take: types.optional(types.number, 50),
  itemCount: types.optional(types.number, 0),
  pageCount: types.optional(types.number, 1),
  hasPreviousPage: types.optional(types.boolean, false),
  hasNextPage: types.optional(types.boolean, false),
})

export interface ListPaginationMeta extends Instance<typeof ListPaginationMetaModel> {}