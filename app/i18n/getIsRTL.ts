import { getLanguage } from "./i18n"

export const isRTL = (): boolean => getLanguage() === "ar"

export const getWritingDirection: () => "rtl" | "ltr" = () => (isRTL() ? "rtl" : "ltr")
