import { getLanguage } from "./i18n"

export const handleArLang = <T extends Record<string, any>>(key: keyof T): keyof T => {
  const language = getLanguage()
  return language === "ar" ? (key as string) + "Ar" : key
}
