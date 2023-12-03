import { AuthContentKey } from "../AuthController"

export default (contentKey: AuthContentKey) => {
  switch (contentKey) {
    case "login":
      return 420
    case "signUp":
      return 574
    case "restorePassword":
      return 340
    default:
      return 390
  }
}
