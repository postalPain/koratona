import { FlashList, ListRenderItem } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { useScrollToTop } from '@react-navigation/native';
import { useStores } from "app/models"
import React, { FC, useRef } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { ProductCard, Screen, Text } from "../../components"
import { spacing, typography } from "../../theme"
import useFetchProducts from "../hooks/useProducts"
import { ProductsStackScreenProps } from "./ProductsStackNavigator"
import { observer } from "mobx-react-lite"
import { Product } from "../../models/Products/Product"
import { NoMoreContent } from "app/components/NoMoreContent"
import { handleArLang } from "app/i18n/handleArLang"
import { translate } from "app/i18n"

export const ProductsScreen: FC<ProductsStackScreenProps<"productsScreen">> = observer(function (
  _props,
) {
  const styles = useStyles()
  const contentListRef = useRef<FlashList<Product>>(null)
  const { productsStore } = useStores()

  useFetchProducts()
  useScrollToTop(useRef({
    scrollToTop: () => {
      contentListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }))

  const renderItem: ListRenderItem<Product> = React.useCallback(
    ({ item }) => (
      <ProductCard
        outOfStock={item.outOfStock}
        name={item[handleArLang<Product>("name")]}
        description={item[handleArLang<Product>("description")]}
        price={item.price}
        bgImage={item.imageUrl}
        onActionPress={() => {
          if (item.outOfStock) {
            return
          }
          _props.navigation.navigate("productPurchase", { id: item.id })
        }}
      />
    ),
    [],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      {productsStore.isFetchingProductsErrored && <Text tx="errors.somethingWentWrong" />}
      <FlashList<Product>
        ref={contentListRef}
        data={[...productsStore.products]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={productsStore.fetchProducts}
        refreshing={productsStore.isFetchingProducts}
        onEndReached={productsStore.fetchMoreProducts}
        ListEmptyComponent={() =>
          !productsStore.isFetchingProducts && (
            <Text
              preset="subheading"
              tx="listContentsScreen.noContentYet"
              txOptions={{ content: translate("listContentsScreen.products") }}
            />
          )
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
                <Text
                  style={styles.fetchingMoreProductsText}
                  tx="listContentsScreen.loadingMoreContent"
                  txOptions={{ content: translate("listContentsScreen.products") }}
                />
              </View>
            )}
            {productsStore.productPaginationMeta.itemCount > 0 &&
              !productsStore.productPaginationMeta.hasNextPage &&
              !productsStore.isFetchingMoreProducts && <NoMoreContent />}
          </>
        }
      />
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  separator: {
    height: spacing.lg,
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
  paddingTop: spacing.xl,
  flex: 1,
}
