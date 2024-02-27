import { ListPaginationMeta } from "app/models/ListPaginationMetaModel"
import { Product } from "app/models/Products/Product"
import { GeneralApiProblem } from "../apiProblem"

export type PostStatus = "Draft" | "Published" | "Archived"

export type ProductsResponse = {
  data: Product[]
  meta: ListPaginationMeta
}

export type FetchProductsService = ({
  page,
  take,
  order,
  teamIds,
}: {
  page?: number
  take?: number
  order?: "ASC" | "DESC",
  teamIds?: number[]
}) => Promise<{ kind: "ok"; data: ProductsResponse } | GeneralApiProblem>

export type FetchProductByIdService = (
  id: number,
) => Promise<{ kind: "ok"; data: Product } | GeneralApiProblem>
