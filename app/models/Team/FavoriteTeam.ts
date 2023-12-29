import { Instance, types } from "mobx-state-tree"
import { TeamModel } from "./Team"

export const FavoriteTeamModel = types.model("FavoriteTeamModel").props({
  userId: types.string,
  teamId: types.identifierNumber,
  createdAt: types.string,
  team: TeamModel,
})

export interface FavoriteTeam extends Instance<typeof FavoriteTeamModel> {}
