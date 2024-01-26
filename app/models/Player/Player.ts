import { Instance, types } from "mobx-state-tree"

// Model for the 'Details' object
const Details = types.model("Details", {
  id: types.optional(types.number, 0),
  type: types.optional(types.string, "0"),
  value: types.model({
    total: types.optional(types.number, 0),
    lowest: types.optional(types.number, 0),
    average: types.optional(types.number, 0),
    highest: types.optional(types.number, 0),
  }),
  type_id: types.optional(types.number, 0),
  player_statistic_id: types.optional(types.number, 0),
})

// Model for the 'Player' object
export const PlayerModel = types
  .model("Player", {
    id: types.number,
    apiId: types.number,
    firstName: types.string,
    lastName: types.string,
    teamId: types.number,
    pictureFilename: types.maybeNull(types.string),
    pictureUrl: types.maybeNull(types.string),
    country: types.maybeNull(types.string),
    nationality: types.maybeNull(types.string),
    city: types.maybeNull(types.string),
    position: types.maybeNull(types.string),
    detailedPosition: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    height: types.maybeNull(types.number),
    weight: types.maybeNull(types.number),
    dateOfBirth: types.maybeNull(types.string),
    jerseyNumber: types.maybeNull(types.number),
    details: types.maybeNull(types.array(Details)),
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
    get age() {
      if (!self.dateOfBirth) {
        return null
      }
      const today = new Date()
      const birthDate = new Date(self.dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
  }))

export interface Player extends Instance<typeof PlayerModel> {}
