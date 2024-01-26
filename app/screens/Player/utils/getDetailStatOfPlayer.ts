import { Player } from "app/models/Player/Player"

export const getDetailStatOfPlayer = (player: Player | undefined | null, typeId: number) =>
  player?.details?.find((detail) => detail.type_id === typeId)

export const statsIDsTable = {
  rating: 118,
  appearance: 321,
  minutes: 119,
  shotsTotal: 42,
  shotsOnTarget: 86,
  goals: 52,
  accuratePassesPercentage: 1584,
  assists: 79,
  passes: 80,
  successfulDribbles: 109,
  dribblesAttempted: 108,
  keyPasses: 117,
  tackles: 78,
  interceptions: 100,
  blockedShots: 97,
  totalDuels: 105,
  duelsWon: 106,
  fouls: 56,
  yellowCards: 84,
  foulsDrawn: 96,
}

export const calculatePercentage = (
  attempts: number | undefined,
  successful: number | undefined,
) => {
  if (!attempts || !successful) return 0
  return attempts ? Math.round((successful / attempts) * 100) : 0
}
