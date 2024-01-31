import { GeneralApiProblem } from "../apiProblem"

export type CreateOrderParams = {
  userId: string
  productId: number
}
export type CreateOrderResponse = {
  amount: string
  createdAt: string
  deletedAt: string | null
  id: number
  productId: number
  status: "Pending" | "Paid" | "Success" | "Fail"
  updatedAt: string
  userId: string
}
export type TCreateOrder = (
  params: CreateOrderParams,
) => Promise<{ kind: "ok"; data: CreateOrderResponse } | GeneralApiProblem>
