import * as Localization from "expo-localization"
import i18n from "i18n-js"

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import ar from "./ar"

i18n.fallbacks = true
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = { ar, en, "en-US": en }

// const locales = Localization.getLocales() // This method is guaranteed to return at least one array item.
// The preferred language is the first element in the array, however, we fallback to en-US, especially for tests.
// // To set default language based on the device locale, we can use the following code:

// const preferredLanguage:
//   | Localization.Locale
//   | { languageTag: string; textDirection: "ltr" | "rtl" } = locales[0] || {
//   languageTag: "en-US",
//   textDirection: "ltr",
// }

// We set the default language as Arabic due to significant number of Arabic users.
const preferredLanguage:
  | Localization.Locale
  | { languageTag: string; textDirection: "ltr" | "rtl" } = {
  languageTag: "ar",
  textDirection: "rtl",
}

i18n.locale = preferredLanguage.languageTag

export const i18NLanguages = ["ar", "en"] as const
export type TLanguage = (typeof i18NLanguages)[number]
export const getLanguage = (): TLanguage => i18n.locale.slice(0, 2) as TLanguage

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
