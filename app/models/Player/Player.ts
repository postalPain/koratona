import { Instance, types } from "mobx-state-tree"

export const PlayerModel = types
  .model("Player")
  .props({
    id: types.identifierNumber,
    apiId: types.number,
    firstName: types.string,
    lastName: types.string,
    teamId: types.number,
    pictureFilename: types.maybeNull(types.string),
    pictureUrl: types.maybeNull(types.string),
    createdAt: types.string,
    updatedAt: types.string,
    deletedAt: types.maybeNull(types.string),
  })
  .views((self) => ({
    get fullName() {
      if (!self.firstName || !self.lastName) {
        return "Unknown"
      }
      return `${self.firstName} ${self.lastName}`
    },
  }))

export interface Player extends Instance<typeof PlayerModel> {}
