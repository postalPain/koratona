import { AuthInfoStoreModel } from "./AuthInfoStore"

test("can be created", () => {
  const instance = AuthInfoStoreModel.create({})

  expect(instance).toBeTruthy()
})
