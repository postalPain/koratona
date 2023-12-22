import { Product } from "app/models/Products/Product"
import { ProductPaginationMeta } from "../../../models/Products/Product"
import { GeneralApiProblem } from "../apiProblem"

export type PostStatus = "Draft" | "Published" | "Archived"

export type ProductsResponse = {
  data: Product[]
  meta: ProductPaginationMeta
}

export type FetchProductsService = ({
  page,
  take,
  order,
}: {
  page?: number
  take?: number
  order?: "ASC" | "DESC"
}) => Promise<{ kind: "ok"; data: ProductsResponse } | GeneralApiProblem>

export type FetchProductByIdService = (
  id: number,
) => Promise<{ kind: "ok"; data: Product } | GeneralApiProblem>
