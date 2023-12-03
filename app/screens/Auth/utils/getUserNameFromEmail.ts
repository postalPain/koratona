export const getUserNameFromEmail = (email: string): string => {
  const name = email.split("@")[0]
  return name
}