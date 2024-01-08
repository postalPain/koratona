/**
 * The types that represent the user data
 */

import { GeneralApiProblem } from "../apiProblem"

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
  customAttributes: {
    dateOfBirth: string;
  };
}

export type GetAuthUserResponse = AuthUser

export type GetAuthUserService = () => Promise<{ kind: "ok"; data: AuthUser } | GeneralApiProblem>

/**
 * The types that represent the applying user settings
 */

export type ApplyUserSettingsResponse = AuthUser
export type ApplyUserSettingsService = () => Promise<{ kind: "ok" } | GeneralApiProblem>

/**
 * The types that represent the credentials needed to restore password
 */

export type UpdateUserPayloadData = Partial<AuthUser>

export type UpdateUserResponse = any

export type UpdateUserService = (
  id: string,
  payload: UpdateUserPayloadData,
) => Promise<{ kind: "ok" } | GeneralApiProblem>
