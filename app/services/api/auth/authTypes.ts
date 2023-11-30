/**
 * This file contains the types for the auth service
 **/

/**
 * The types that represent the credentials needed to login
 */

import { GeneralApiProblem } from "../apiProblem"

export type AuthLoginCredentials = {
  username: string
  password: string
}

export type AuthLoginResponse = {
  result: string
  data: {
    accessToken: string
    refreshToken: string
    idToken: string
  }
}

export type LoginService = (
  credentials: AuthLoginCredentials,
) => Promise<{ kind: "ok"; token: string } | GeneralApiProblem>

/**
 * The types that represent the credentials needed to sign up
 */

export type AuthSignUpCredentials = {
  username: string
  password: string
  phone?: string
  firstName?: string
  lastName: string
}

export type AuthSignUpResponse = {
  mail_verification_type: string
}

export type SignUpService = (
  credentials: AuthSignUpCredentials,
) => Promise<{ kind: "ok" } | GeneralApiProblem>

/**
 * The types that represent the credentials needed to restore password
 */

export type RestorePasswordCredentials = {
  username: string
}

export type RestorePasswordResponse = {
  forgot_password_type: string
}

export type RestorePasswordService = (
  credentials: RestorePasswordCredentials,
) => Promise<{ kind: "ok" } | GeneralApiProblem>

/**
 * The types that represent the user data
 */

export type AuthUser = {
  email: string
  password: string
  id: string
  firstName: string
  lastName: string
  username: string
  phone: string
  enabled: string
  roles: string[]
}

export type GetAuthUserResponse = AuthUser

export type GetAuthUserService = () => Promise<{ kind: "ok"; data: AuthUser } | GeneralApiProblem>
