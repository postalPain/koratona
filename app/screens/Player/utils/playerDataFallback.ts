// Utility function to handle nullable or undefined values
export const formatPlayerInfoValue = <T>(value: T | null | undefined, fallback?: T): string => {
  if (value !== null && value !== undefined) {
    return `${value}`
  }

  if (fallback !== undefined) {
    return `${fallback}`
  }

  return "n/a"
}
