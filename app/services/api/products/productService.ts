import { ApiResponse } from "apisauce"
import { Product } from "app/models/Products/Product"
import { api } from "../api"
import { getGeneralApiProblem } from "../apiProblem"
import * as ProductTypes from "./productTypes"

export const fetchProducts: ProductTypes.FetchProductsService = async ({
  page = 1,
  take = 50,
  order = "DESC",
}) => {
  let response = {} as ApiResponse<ProductTypes.ProductsResponse>

  try {
    response = await api.apisauce.get(
      `product?order=${order}&page=${page}&take=${take}&outOfStock=${false}`,
    )
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

export const fetchProductById: ProductTypes.FetchProductByIdService = async (id) => {
  let response = {} as ApiResponse<Product>

  try {
    response = await api.apisauce.get(`product/${id}`)

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
