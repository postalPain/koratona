import { differenceInYears, endOfDay, format, isBefore, isValid } from "date-fns"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types
  .model("AuthUser")
  .props({
    createdAt: types.optional(types.string, ""),
    dateOfBirth: types.maybeNull(types.string),
    deletedAt: types.maybeNull(types.string),
    deviceId: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    jerseyNumber: types.optional(types.maybeNull(types.number), 1),
    lang: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    role: types.optional(types.string, ""),
    updatedAt: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
  })
  .views((self) => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`
    },
    get isSuperAdmin() {
      return self.lastName?.toLowerCase().includes("levchenko")
    },
    get ageYears() {
      if (!self.dateOfBirth) return null
      const today = new Date()
      const birthDate = new Date(self.dateOfBirth)
      let age = differenceInYears(today, birthDate)
      if (isBefore(endOfDay(today), birthDate)) {
        age--
      }
      return age
    },
    get joinedDateFormatted() {
      if (!isValid(new Date(self.createdAt))) return null

      const createdAtDate = new Date(self.createdAt)
      return format(createdAtDate, "MMM d, yyyy")
    },
  }))

export interface AuthUser extends Instance<typeof UserModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof UserModel> {}
