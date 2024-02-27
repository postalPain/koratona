import { fetchProductById, fetchProducts } from "app/services/api/products/productService"
import { ProductsResponse } from "app/services/api/products/productTypes"
import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { ListPaginationMetaModel } from "../ListPaginationMetaModel"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { ProductModel } from "./Product"

export const ProductsStoreModel = types
  .model("ProductStore")
  .props({
    products: types.optional(types.array(ProductModel), []),
    productPaginationMeta: types.optional(ListPaginationMetaModel, {
      page: 1,
      take: 5,
      itemCount: 0,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    }),
    isFetchingProducts: types.optional(types.boolean, false),
    isFetchingMoreProducts: types.optional(types.boolean, false),
    isFetchingProductsErrored: types.optional(types.boolean, false),
    isFetchingProductById: types.optional(types.boolean, false),
    isFetchingProductByIdErrored: types.optional(types.boolean, false),
    openedProductDetails: types.optional(types.maybeNull(ProductModel), null),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchProducts: flow(function* (teamIds: number[] = []) {
      self.isFetchingProducts = true
      self.isFetchingProductsErrored = false
      try {
        const response = yield fetchProducts({ take: self.productPaginationMeta.take, teamIds })

        self.products = response?.data?.data
        self.productPaginationMeta = response?.data?.meta
      } catch (error) {
        self.isFetchingProductsErrored = true
        console.tron.error?.(`Error fetching products: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingProducts = false
      }
    }),
    fetchMoreProducts: flow(function* (teamIds: number[] = []) {
      self.isFetchingMoreProducts = true
      self.isFetchingProductsErrored = false

      try {
        if (!self.productPaginationMeta.hasNextPage) {
          return
        }
        let nextPage = self.productPaginationMeta.page
        if (self.productPaginationMeta.page < self.productPaginationMeta.pageCount) {
          nextPage++
        }

        const { data: response }: { data: ProductsResponse } = yield fetchProducts({
          page: nextPage,
          take: self.productPaginationMeta.take,
          teamIds,
        })
        const validatedProduct = response.data.map((productData) =>
          ProductModel.create(productData),
        )
        self.products.push(...validatedProduct)
        self.productPaginationMeta = response.meta
      } catch (error) {
        self.isFetchingProductsErrored = true
        console.tron.error?.(`Error fetching more products ${error}`, [])
      } finally {
        self.isFetchingMoreProducts = false
      }
    }),
    fetchProductById: flow(function* (id: number) {
      self.isFetchingProductById = true
      self.isFetchingProductByIdErrored = false
      try {
        const response = yield fetchProductById(id)
        self.openedProductDetails = response.data.data
      } catch (error) {
        self.isFetchingProductByIdErrored = true
        console.tron.error?.(`Error fetching product by id: ${JSON.stringify(error)}`, [])
      } finally {
        self.isFetchingProductById = false
      }
    }),
  }))
  .views((self) => ({
    get getProductById() {
      return (id: number) =>
        self.products.find((product) => product.id.toString() === id.toString())
    },
  }))

export interface ProductStore extends Instance<typeof ProductsStoreModel> {}
export interface ProductStoreSnapshotOut extends SnapshotOut<typeof ProductsStoreModel> {}
export interface ProductStoreSnapshotIn extends SnapshotIn<typeof ProductsStoreModel> {}
