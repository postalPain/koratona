import { FlashList, ListRenderItem } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { useStores } from "app/models"
import React, { FC } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { ProductCard, Screen, Text } from "../../components"
import { spacing, typography } from "../../theme"
import useFetchProducts from "../hooks/useProducts"
import { ProductsStackScreenProps } from "./ProductsStackNavigator"
import { observer } from "mobx-react-lite"
import { Product } from "../../models/Products/Product"

export const ProductsScreen: FC<ProductsStackScreenProps<"productsScreen">> = observer(function (
  _props,
) {
  const styles = useStyles()
  const { productsStore } = useStores()

  useFetchProducts()

  const renderItem: ListRenderItem<Product> = React.useCallback(
    ({ item }) => (
      <ProductCard
        outOfStock={item.outOfStock}
        name={item.name}
        description={item.description}
        price={item.price}
        bgImage={item.imageUrl}
        onActionPress={() => {
          _props.navigation.navigate("productPurchase", { id: item.id })
        }}
      />
    ),
    [],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      {productsStore.isFetchingProductsErrored && (
        <Text text="Something went wrong, please try again..." />
      )}
      <FlashList<Product>
        data={[...productsStore.products]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={productsStore.fetchProducts}
        refreshing={productsStore.isFetchingProducts}
        onEndReached={productsStore.fetchMoreProducts}
        ListEmptyComponent={() =>
          !productsStore.fetchProducts && <Text preset="subheading" text="No products yet..." />
        }
        keyExtractor={(item) => item?.id?.toString()}
        onEndReachedThreshold={0.3}
        renderItem={renderItem}
        estimatedItemSize={448}
        ListFooterComponent={
          <>
            {productsStore.isFetchingMoreProducts && (
              <View style={styles.fetchingMoreProducts}>
                <ActivityIndicator color="#333865" />
                <Text style={styles.fetchingMoreProductsText} text="Loading more posts..." />
              </View>
            )}
            {productsStore.productPaginationMeta.itemCount > 0 &&
              !productsStore.productPaginationMeta.hasNextPage &&
              !productsStore.isFetchingMoreProducts && (
                <Text weight="medium" style={styles.noMoreProductsText} text="No more posts" />
              )}
          </>
        }
      />
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  separator: {
    height: spacing.xl,
  },
  fetchingMoreProducts: {
    paddingVertical: spacing.xl,
    textAlign: "center",
    justifyContent: "center",
  },
  fetchingMoreProductsText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
  noMoreProductsText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
}))

const $container: ViewStyle = {
  paddingTop: spacing.xxl,
  flex: 1,
}
