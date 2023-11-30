import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types.model("AuthUser").props({
  email: types.optional(types.string, ""),
  phone: types.optional(types.string, ""),
  firstName: types.optional(types.string, ""),
  lastName: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  id: types.optional(types.string, ""),
  roles: types.optional(types.array(types.string), []),
  enabled: types.optional(types.boolean, false),
}).views((self) => ({
  get fullName() {
    return `${self.firstName} ${self.lastName}`
  },
}))

export interface AuthUser extends Instance<typeof UserModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof UserModel> {}
