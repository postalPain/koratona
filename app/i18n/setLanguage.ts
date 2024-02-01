import I18n from "i18n-js"
import { I18nManager } from "react-native"
import { TLanguage } from "./i18n"
import * as storage from "app/utils/storage"

export const setLanguage = (language: TLanguage) => {
  I18n.locale = language
  storage.save("language", language)

  const LTR = language === "ar"
  I18nManager.allowRTL(LTR)
  I18nManager.forceRTL(LTR)
}
