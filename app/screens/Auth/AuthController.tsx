import React, { FC } from "react"
import { LoginContent } from "./LoginContent"
import { SignUpContent } from "./SignUpContent"

type AuthControllerProps = {
  contentKey: "login" | "signUp" | "restorePassword"
}

export const AuthController: FC<AuthControllerProps> = ({ contentKey }) => {
  const getContent = () => {
    switch (contentKey) {
      case "login":
        return <LoginContent />
      case "signUp":
        return <SignUpContent />
      case "restorePassword":
        return <SignUpContent />
      // return <RestorePasswordContent />
      default:
        return <LoginContent />
    }
  }

  return getContent()
}
