import * as Localization from "expo-localization"

const getCountryCodeFromLocale = (locale: string): string | undefined => {
  // Implement logic to extract the country code from the locale
  // Example: 'en-US' -> 'US'
  const countryCode = locale.split("-")[1]
  return countryCode
}

export const getDeviceCountryCode = (): string | undefined => {
  const locale: string = Localization.locale
  const countryCode = getCountryCodeFromLocale(locale)
  return countryCode
}
