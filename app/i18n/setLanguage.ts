import I18n from "i18n-js"
import { I18nManager } from "react-native"
import { TLanguage } from "./i18n"
import * as storage from "app/utils/storage"

export const LANGUAGE_KEY = "language"

export const setLanguage = (language: TLanguage, cb?: () => void) => {
  I18n.locale = language
  storage.save(LANGUAGE_KEY, language).then(() => {
    if (cb) {
      cb()
    }
  })

  const RTL = language === "ar"
  I18nManager.allowRTL(RTL)
  I18nManager.forceRTL(RTL)
}
