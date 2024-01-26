/**
 * The types that represent the user data
 */

import { GeneralApiProblem } from "../apiProblem"

export type AuthUser = {
  createdAt: string
  dateOfBirth: string | null
  deletedAt: string | null
  deviceId: string
  email: string | null
  firstName: string | null
  lastName: string | null
  lang: string
  phone: string
  role: string
  updatedAt: string
  userId: string
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

export type UpdateUserPayloadData = Partial<{
  firstName: string
  lastName: string
  dateOfBirth: string
  jerseyNumber: string
  email: string
  userId: string
}>

export type UpdateUserResponse = any

export type UpdateUserService = (
  payload: UpdateUserPayloadData,
) => Promise<{ kind: "ok" } | GeneralApiProblem>
