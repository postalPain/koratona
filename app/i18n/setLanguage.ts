import I18n from "i18n-js"
import { I18nManager } from "react-native"
import { TLanguage } from "./i18n"

export const setLanguage = (language: TLanguage) => {
  I18n.locale = language

  const LTR = language === "ar"
  I18nManager.allowRTL(LTR)
  I18nManager.forceRTL(LTR)
}
