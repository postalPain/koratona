import { ApiResponse } from "apisauce"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as OrderTypes from "./orderTypes"

export const createOrder: OrderTypes.TCreateOrder = async (params) => {
  let response = {} as ApiResponse<OrderTypes.CreateOrderResponse>

  try {
    response = await api.apisauce.post('order', {
      ...params,
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (!response.data) {
      return { kind: "bad-data" }
    }

    return { kind: "ok", data: response.data }
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data" }
  }
}
