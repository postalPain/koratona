import { getLanguage } from "./i18n"

export const isRTL = (): boolean => getLanguage() === "ar"
