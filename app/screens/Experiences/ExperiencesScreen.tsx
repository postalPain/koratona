import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { ExperienceCard, Text } from "../../components"
import { spacing } from "../../theme"
import { ExperiencesStackScreenProps } from "./ExperiencesStackNavigator"

const data = Array.from({ length: 10 }, (_, i) => i)

export const ExperiencesScreen: FC<ExperiencesStackScreenProps<"experiencesScreen">> =
  function DemoDebugScreen(_props) {
    const styles = useStyles()

    const handlePurchase = () => {
      _props.navigation.navigate("experiencePurchase", { id: 1 })
    }

    const renderItem = () => (
      <ExperienceCard
        name="Training Day (DEC 21)"
        description="Watch Al Hilal team’s training the day before this weeks match"
        price="SAR 1,500"
        onActionPress={handlePurchase}
      />
    )

    return (
      <View style={$container}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // onRefresh={postsStore.fetchPosts}
          // refreshing={postsStore.isFetchingPosts}
          // onEndReached={postsStore.fetchMorePosts}
          ListEmptyComponent={() => <Text preset="subheading" text="No posts yet..." />}
          // extraData={postsStore.postsCount}
          // keyExtractor={(item) => item.id.toString()}
          // onEndReachedThreshold={0.3}
          renderItem={renderItem}
        />
      </View>
    )
  }

const useStyles = createUseStyles(() => ({
  separator: {
    height: spacing.xl,
  },
}))

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.sm,
}
