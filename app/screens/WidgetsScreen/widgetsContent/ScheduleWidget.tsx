import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { extractNumberFromId } from "app/utils/extractFixtureId"
import React from "react"
import { useWindowDimensions } from "react-native"
import WebView from "react-native-webview"

type Props = {
  onMatchPress: (fixtureId: number) => void
}

export const ScheduleWidget: React.FC<Props> = ({ onMatchPress }) => {
  const styles = useStyles()
  const { height, width } = useWindowDimensions()

  return (
    <WebView
      webviewDebuggingEnabled
      originWhitelist={["*"]}
      onMessage={(event) => {
        const message = event.nativeEvent.data
        const fixtureId = extractNumberFromId(message)
        if (fixtureId) {
          onMatchPress(fixtureId)
        }
      }}
      source={{
        baseUrl: "https://widgets.sportmonks.com",
        html: `<html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://widgets.sportmonks.com/css/app.css" />
        <script type="text/javascript" src="https://widgets.sportmonks.com/js/team/seasonSchedule.js" defer></script>
      </head>

      <body>
      <div
        id="sportmonks-widget"
        data-widget="team-schedule"
        data-team="7011"
        data-info="JC8hgO8PovvJJ/NJkUK+IapJlbumDQ7lrrCwDiOeXEf4YfhnogrjIIDP63rexWxAGIvDICTer3p3jji2ie37nUsiN8qrjDSwl4SMqUE+no53Sn83MVI15YLmOhtWIjT4NmnLsWLMttBOG+S12fakgX1JM4ToDUHGbl+I8QIdl2sFl4K2MdI0Mrw7OCO6jLQnMmuM1E59UYCkpDBRuwNiE95wGhn/OFU8wwQGL92v6KTiieTRmvhRkFIhOnMVTDkI6hoHUvkPY8z8PS8NP3BsLid7b0uTFV7Kq+UNiSWi36Swn4tEvAuZJ4BQG1F9Mzb7avseQ1RgQRJGcvCALCsrL/cZZ0ERfobkTKcT9zVACPoMJUUOpnBCfLT5PQ0SQGtYDwyq+Lui0jh5XBZAUxKTp/NpBA7eLZnuFnnGeeXsy89OyM5+LoGaqaaNZRIU7l4KLVeetVmAU88pRYq49QA0/168drbV1SnWj7JNnLu9PkaCfZf9PwhyLkWb3IO/yCXYNW0FYjXKDnaypE59kv4XBMPPGkD1s29kAsOFniGhh3xA7xg0ZdPMt0R1ALqBRDoNt/f3NRgFy62gaGM84UrTIVPSdoyaBRU8LeN/IgTa4hQTFC4+zMvNL9jsq5gAXacRBppuhctMfV4WApJSde6MmOZNyBrs6cwxl4Cb+DlJyBg="
        data-switchtheme="false"
        data-tz="Asia/Riyadh"
        data-paginated="false"
        data-brand="https://objectstorage.me-jeddah-1.oraclecloud.com/n/axfbamifisvy/b/bucket-20231126-2014/o/logowidget%20logo%20(2).png"
      ></div>
      <script>
        document.querySelector('script[src="https://widgets.sportmonks.com/js/team/seasonSchedule.js"]').addEventListener("load", () => {
          window.addEventListener("DOMContentLoaded", (event) => {
            const handleDynamicContent = () => {
              const matchingDivs = document.getElementById("sportmonks-widget").querySelectorAll('div[id^="fixture-"]');
              if (matchingDivs.length > 0) {
                matchingDivs.forEach((div) => {
                  div.addEventListener("click", () => {
                    window.ReactNativeWebView.postMessage(div.id);
                  });
                });
                observer.disconnect();
              }
            };
            const observer = new MutationObserver(handleDynamicContent);
            observer.observe(document.getElementById("sportmonks-widget"), { childList: true, subtree: true });
            handleDynamicContent();
          });
        });
      </script>
      </body>
    </html>
    `,
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
