import { ExpoConfig } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

module.exports = (): Partial<ExpoConfig> => {
  const DEV_BUILD = process.env.EXPO_PUBLIC_ENV !== 'production';
  const config: Partial<ExpoConfig> = {
    "name": "FootballApp",
    // @ts-ignore
    "displayName": "Fanfinity",
    "expo": {
      "owner": "stryber",
      "name": "Fanfinity",
      "slug": "football-app",
      "scheme": "football-app",
      "version": "1.2.0",
      "orientation": "portrait",
      "icon": "./assets/images/app-icon-all.png",
      "splash": {
        "image": "./assets/images/splash-logo-all.png",
        "resizeMode": "contain",
        "backgroundColor": "#1973DC"
      },
      "updates": {
        "url": "https://u.expo.dev/d2982e41-5b98-46c8-8e68-f0a553ac5ea4"
      },
      "runtimeVersion": "appVersion",
      "jsEngine": "hermes",
      "assetBundlePatterns": ["**/*"],
      "android": {
        "icon": "./assets/images/app-icon-android-legacy.png",
        "package": "com.footballappcortona.app",
        "adaptiveIcon": {
          "foregroundImage": "./assets/images/app-icon-android-adaptive-foreground.png",
          "backgroundImage": "./assets/images/app-icon-android-adaptive-background.png"
        },
        "splash": {
          "image": "./assets/images/splash-logo-android-universal.png",
          "resizeMode": "contain",
          "backgroundColor": "#1973DC"
        },
        "intentFilters": [
          {
            "action": "VIEW",
            "autoVerify": true,
            "category": ["BROWSABLE", "DEFAULT"]
          }
        ],
        "googleServicesFile": `./google-services${DEV_BUILD ? '_dev' : ''}.json`,
        "blockedPermissions": ["com.google.android.gms.permission.AD_ID"]
      },
      "ios": {
        "icon": "./assets/images/app-icon-ios.png",
        "supportsTablet": true,
        "bundleIdentifier": "com.FootballAppCoratona",
        "splash": {
          "image": "./assets/images/splash-logo-ios-mobile.png",
          "tabletImage": "./assets/images/splash-logo-ios-tablet.png",
          "resizeMode": "contain",
          "backgroundColor": "#1973DC"
        },
        "config": {
          "usesNonExemptEncryption": false
        },
        "googleServicesFile": `./GoogleService-Info${DEV_BUILD ? '_dev' : ''}.plist`
      },
      "web": {
        "favicon": "./assets/images/app-icon-web-favicon.png",
        "splash": {
          "image": "./assets/images/splash-logo-web.png",
          "resizeMode": "contain",
          "backgroundColor": "#1973DC"
        },
        "bundler": "metro"
      },
      "plugins": [
        "expo-localization",
        [
          "expo-build-properties",
          {
            "ios": {
              "newArchEnabled": false,
              "useFrameworks": "static"
            },
            "android": {
              "newArchEnabled": false
            }
          }
        ],
        "@react-native-firebase/app"
      ],
      "experiments": {
        "tsconfigPaths": true
      },
      "extra": {
        "eas": {
          "projectId": "d2982e41-5b98-46c8-8e68-f0a553ac5ea4"
        }
      }
    },
    "ignite": {
      "version": "9.0.2"
    }
  };
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    plugins: [
      ...existingPlugins,
      require("./plugins/withSplashScreen").withSplashScreen,
    ],
  }
}
