import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns"

export const getPostCreationTime = (createdAt: string): string => {
  const parsedDate = parseISO(createdAt)
  const distanceToNow = formatDistanceToNow(parsedDate, { addSuffix: true })

  if (isToday(parsedDate)) {
    return distanceToNow
  } else if (isYesterday(parsedDate)) {
    return "Yesterday"
  } else {
    // For dates older than yesterday, return the formatted date
    return distanceToNow
  }
}
