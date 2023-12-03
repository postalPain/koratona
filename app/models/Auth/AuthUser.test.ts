import { AuthInfoStoreModel } from "../User/UserStore"

test("can be created", () => {
  const instance = AuthInfoStoreModel.create({})

  expect(instance).toBeTruthy()
})
