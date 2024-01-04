export function extractNumberFromId(idString: string): number | null {
  const match = idString.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}
