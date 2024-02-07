import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { getLanguage } from "app/i18n"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, useWindowDimensions } from "react-native"
import WebView from "react-native-webview"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"

interface MatchWidgetScreenProps extends HomeFeedStackScreenProps<"matchCenter"> {}

export const MatchWidgetScreen: FC<MatchWidgetScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const fixtureId = _props.route.params.fixtureId
  const { height, width } = useWindowDimensions()
  const lang = getLanguage()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screenContainer}>
      <View style={styles.header}>
        <GoBackComponent
          onPress={() => {
            _props.navigation.goBack()
          }}
        />
      </View>
      <View style={styles.webViewWrapper}>
        <WebView
          webviewDebuggingEnabled
          originWhitelist={["*"]}
          source={{
            baseUrl: "https://widgets.sportmonks.com",
            html: `<html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://widgets.sportmonks.com/css/app.css" />
          </head>
          <body>
            <div
              id="sportmonks-widget"
              data-widget="match-centre"
              data-info="oX9e3RL53ZxSvxP8LHVla6bJrJZaEvoYul1ZZLYZ+8T7mjL/E1PSQRPTAwRppyRQPkCZIKqBRjxJA07zo7PVhXIx4NKhkZ2hrXsV2dbnG443FeBjAtSSPPnEOvYR7rNQ659zgMOaBZCOfdOPL5G+ubwDdXEmg2cxBEppuk2sRlxvMG2RMchAA6cLxdneWDaYfqn2vE8XWtdE88nGVPNAgEze6972s7ou4UA3rfU5fVeylDyG0MI1Cac6Tw3LM5ibQO7MfGpDeju24CnHca5r9qRPdMDsr7lBufuB5r/pDiWKhiLve0j6xlfWzMx3Ds3GFFgkc46PJPVfk+5jlzrZEF9BndhZsZDdtQnFFtCjaZ8orR+bw3d6wsdCAfiyNkmeEg4OeVJf1VB6ruuWXWECm5fI/6bYk67w6PKjo5czfQ8UkItYVgS7CJGIWoR+SRTUn570Yl2Q1agyDI31CBuypc1hKOPsFVSe+kqMpJYVNY1s+nSSfYZ7GGVh1MZNbzqu4NISqyZDvQ6uuhVz34vlvKezJ2j4xRqskqPdDTwy+mudcj9IgQrtYXd5IZyfEDOo2n3qne6RSw735pvZDZS/rCL1d4j6q8wjGIpc14yiuOHZTi1q67iAXpZj5vCZxV0y/v5AwC4UwuNHsVwt2BfDShr6N/1E6dkpfDxxqCv9yCQ="
              data-fixture="${fixtureId}"
              data-colors="#00063E,#1973DC,#D0D0D9,#1A1F51"
              data-brand="https://objectstorage.me-jeddah-1.oraclecloud.com/n/axfbamifisvy/b/bucket-20240124-1411/o/logoDefault_145px%20(1).png"
              data-tz="Asia/Riyadh"
              data-switchtheme="false"
              data-lang="${lang}"
              ></div>
            <script type="text/javascript" src="https://widgets.sportmonks.com/js/livescore/match-centre.js"></script>
          </body>
        </html>`,
          }}
          style={{ ...styles.webviewStyles, height: height - 250, width }}
        />
      </View>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  screenContainer: {
    height: "100%",
    flex: 1,
  },
  goBackComponent: {
    position: "absolute",
    left: 24,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingLeft: 24,
  },
  webviewStyles: {
    width: "100%",
    marginTop: 10,
    opacity: 0.99,
    overflow: "hidden",
  },
  webViewWrapper: {
    paddingHorizontal: 24,
    alignSelf: "center",
    paddingBottom: 60,
  },
}))
