import React, { FC } from "react";
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import WebView from "react-native-webview";
import { createUseStyles } from "@stryberventures/gaia-react-native.theme";
import { Screen } from "app/components";
import { ProductsStackScreenProps } from "./ProductsStackNavigator";
import { GoBackComponent } from "app/components/GoBack"


interface Purchase3DSVerificationScreenProps extends ProductsStackScreenProps<"purchase3DSVerification"> {}

export const Purchase3DSVerificationScreen: FC<Purchase3DSVerificationScreenProps> = observer(
  function ProductResultScreen(_props) {
    const styles = useStyles();

    const onWebViewMessage = () => {
      _props.navigation.navigate("productPurchaseResult");
    };

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContainer}>
        <View style={styles.header}>
          <GoBackComponent onPress={_props.navigation.goBack} />
        </View>
        <WebView
          // @ts-ignore
          source={{ url: _props.route.params.url, }}
          originWhitelist={['*']}
          startInLoadingState
          onMessage={onWebViewMessage}
          style={styles.webview}
        />
      </Screen>
    )
  },
)
const useStyles = createUseStyles((theme) => ({
  screenContainer: {
    flex: 1,
    paddingBottom: theme.spacing[32],
  },
  header: {
    paddingHorizontal: theme.spacing[24],
  },
  webview: {
    flex: 1,
    marginHorizontal: theme.spacing[24],
  },
}))
