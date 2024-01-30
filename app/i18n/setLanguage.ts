import I18n from "i18n-js"
import { TLanguage } from "./i18n"

export const setLanguage = (language: TLanguage) => {
  I18n.locale = language
}
