import { Instance, types } from "mobx-state-tree"

export const TeamModel = types.model("Team").props({
  id: types.identifierNumber,
  apiId: types.number,
  name: types.string,
  description: types.string,
  logoFilename: types.maybeNull(types.string),
  logoUrl: types.maybeNull(types.string),
  createdAt: types.string,
  updatedAt: types.string,
  deletedAt: types.maybeNull(types.string),
})

export interface Team extends Instance<typeof TeamModel> {}
