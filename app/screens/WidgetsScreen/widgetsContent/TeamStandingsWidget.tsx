import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { useWindowDimensions } from "react-native"
import WebView from "react-native-webview"

export const TeamStandingsWidget: React.FC = () => {
  const styles = useStyles()
  const { height, width } = useWindowDimensions()

  return (
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
                    data-widget="team-standings"
                    data-team="7011"
                    data-info="wZrLIdf/hV3XbYsh74zYq3MzGgrKsSMbqt0HHfwJtqYImoCLPxhMiwYrPXyXI8nL6xSOamyRFKKFsuuiCP76wXXygpUo9s9yOD7HKPE5WqURim7V2XbOq0F0w+/D9+n317BhNg5tysYtt6MzGYBxfOsAvWJMB5BEQ/wbcrCGKCx70YmpTD8PD/4VydLCY2RIcUFmgDNjh+VLQYPJ4v8oWwwY/SPTh5budX5ictdGCR9p3XmRrWhUEQsreuovAvvVI1KCGe3E6Pre8Xq6f8G+hS3ShUCHpH6DWF65YdTh1Ab5656/hsxdpEw0b6JTjbRBRfzwePOVdkZ0yZ700iYxorXp3EJI3xcxoOsENV/8vaiyAM9sS62cGCmiHVRITd01FXbIrL9nl7vZ1x80qiB4NiF6iA9yf9zz7zMMznsFMPXjUYm8H0Hf4HFiusnhfln4DvdbXg5/vOc5iE/vr6J38s56ICzzl796OZ4qfbAw43/q4SNJD1XlSG5jV1fPAIekn35eIXTfpR0e6o4ERbxeErDh7jH7CRQrOWeg6h8tq09ETC4QRsxQ9iR4ZwNUSmDMpRmRp4fpaxKa1xFn2xMoaXYkZZxSJotbRdrk9iRHpmjeEfIQ8vex+jy8V7vPlZWRSM9Tc0zhJStyFMh3J6DLPXW37DY6c9H8lz4kxA4CRqc="
                    data-colors="#00063E,#D0D0D9,#D0D0D9,#1A1F51"
                    data-brand="https://objectstorage.me-jeddah-1.oraclecloud.com/n/axfbamifisvy/b/bucket-20240124-1411/o/logoDefault_145px%20(1).png"
                    data-switchtheme="false"
                    data-tz="Asia/Riyadh"
                  ></div>
                    <script type="text/javascript" src="https://widgets.sportmonks.com/js/team/standings.js"></script>
                  </body>
      </html>`,
      }}
      style={{ ...styles.webviewStyles, height: height - 250, width }}
    />
  )
}

const useStyles = createUseStyles(() => ({
  webviewStyles: {
    width: "100%",
    marginTop: 10,
    opacity: 0.99,
    overflow: "hidden",
  },
}))
