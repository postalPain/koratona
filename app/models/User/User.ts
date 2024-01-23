import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types
  .model("AuthUser")
  .props({
    createdAt: types.optional(types.string, ""),
    dateOfBirth: types.maybeNull(types.string),
    deletedAt: types.maybeNull(types.string),
    deviceId: types.optional(types.string, ""),
    email: types.maybeNull(types.string),
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
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
  }))

export interface AuthUser extends Instance<typeof UserModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof UserModel> {}
