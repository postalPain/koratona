import { getLanguage, translate } from "app/i18n"
import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns"

import arSA from "date-fns/locale/ar-SA"

export const getPostCreationTime = (createdAt: string): string => {
  const parsedDate = parseISO(createdAt)
  const language = getLanguage()

  const distanceToNow = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: language === "ar" ? arSA : undefined,
  })

  if (isToday(parsedDate)) {
    return distanceToNow
  } else if (isYesterday(parsedDate)) {
    return translate("common.yesterday")
  } else {
    // For dates older than yesterday, return the formatted date
    return distanceToNow
  }
}
