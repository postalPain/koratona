import React, { FC } from "react"

import { ForgotPasswordContent, LoginContent, SignUpContent } from "./AuthContent"

export type AuthContentKey = "login" | "signUp" | "restorePassword"

type AuthControllerProps = {
  contentKey: AuthContentKey
  setContentKey: (key: AuthContentKey) => () => void
  onClose: () => void
}

export const AuthController: FC<AuthControllerProps> = ({ contentKey, setContentKey, onClose }) => {
  const getContent = () => {
    switch (contentKey) {
      case "login":
        return <LoginContent setContentKey={setContentKey} />
      case "signUp":
        return <SignUpContent onClose={onClose} />
      case "restorePassword":
        return <ForgotPasswordContent setContentKey={setContentKey} />
      default:
        return <LoginContent setContentKey={setContentKey} />
    }
  }

  return getContent()
}
