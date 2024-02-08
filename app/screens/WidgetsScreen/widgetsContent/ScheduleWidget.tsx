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
        data-info="Akz+5Vd6n/4SrlMQvrpfL/nZm9ywX20M7vRb5qZ71+CV2ILbnxUejLgB9Kq+vUZQ+xvl9WIlWb6T5cHhivldBmUC3Wq7T3YKUg35evLIkG39ZbvZPrqXCugPuGcJHTNfvFaX23hFwAtqIwV0jXXZEyD5pJzFOvApu9IufVEQsSIiFElX4HWO/UcVgUB4t4CpHmF+l9J/XB7LdNsgQIODCNuXX2V0w9VK+fys3xZ0NazcMwck8uL0el8/ajk+8KR0eNsZTatzk6yLNSUdJBrHZoPe/iwzBh775zp4yeN9+bi1EelEgqdhslqgaNpgybScSgqhIqGdClDYw7XHtcAKOABa2t/6wAeHHAGhJYtgWwiUDRdgS+xzOHdQbEoIOtyXQxL6Fzz9enstNizLE50Zy0gw+3hpBAYL9N/Bjjh1D8JsA/QkDjSdDtncpUIVmMmoxW0bU/54aSkOwA6UQvGdemz4wHW9hJCqX9SYqAcVgxcz9DB7hyKW2gqitwZA04emEggU5yCyyUstWU+JEIhyKkDOSTJcu5namHkzahoR9wvdZMnJxSN5x6pE7UZYoLJy6kZqcpnrH5EWfNBzEXzfKC9lQ23N9VRMX4+0N7vpI/bwfdjm+pCII4xBf0J5eYb8arEiivzo5daqR5t/0VBEnBaZxX8QC0Je4Ds5Zf0GUuY="
        data-colors="#00063E,#00063E,#D0D0D9,#1A1F51"
        data-switchtheme="false"
        data-tz="Asia/Riyadh"
        data-paginated="false"
        data-brand="https://objectstorage.me-jeddah-1.oraclecloud.com/n/axfbamifisvy/b/bucket-20240124-1411/o/logoDefault_145px%20(1).png"
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
