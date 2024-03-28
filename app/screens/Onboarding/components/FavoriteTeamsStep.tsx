import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React, { useState, useEffect } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { Button, Text } from "app/components"
import { getTypographyPresets } from "app/theme"
import { useStores } from "app/models"
import useFetchTeamList from "../../hooks/useTeamList"
import useGetFavoriteTeam from "../../hooks/useGetFavoriteTeam"
import FavoriteTeamItem from "../components/FavoriteTeamItem"

type FavoriteTeamsStepProps = {
  style?: ViewStyle
  onNext: () => void
}

const MAX_FAVORITE_COUNT = 3

const FavoriteTeamsStep: React.FC<FavoriteTeamsStepProps> = ({ style, onNext }) => {
  const styles = useStyles()
  const { teamStore } = useStores()
  const [favoriteTeams, setFavoriteTeams] = useState<number[]>([])
  const onFavoriteToggle = (id: number, favorite: boolean) => {
    if (!favorite || favoriteTeams.length < MAX_FAVORITE_COUNT) {
      const itemIndex = favoriteTeams.indexOf(id)
      const newFavoriteTeams =
        !favorite && itemIndex > -1
          ? [...favoriteTeams.slice(0, itemIndex), ...favoriteTeams.slice(itemIndex + 1)]
          : favorite && itemIndex === -1
          ? [...favoriteTeams, id]
          : favoriteTeams

      setFavoriteTeams([...newFavoriteTeams])
    }
  }
  const onContinue = () => {
    teamStore.updateFavoriteTeams(favoriteTeams)
    onNext()
  }

  useEffect(() => {
    const fetchedAllFavoriteTeams = teamStore.allFavoriteTeams.map((item) => item.id)
    setFavoriteTeams([...fetchedAllFavoriteTeams])
  }, [teamStore.allFavoriteTeams])

  useFetchTeamList()
  useGetFavoriteTeam()

  const favoriteMap = favoriteTeams.reduce((obj: { [key: number]: boolean }, teamId) => {
    obj[teamId] = true
    return obj
  }, {})

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.headingBox}>
          <Text
            style={styles.text}
            tx={"onboardingCarousel.pickYourFavorites.heading"}
            preset="heading"
          />
        </View>
        <View style={styles.teamListContainer}>
          <ScrollView>
            <View style={styles.teamList}>
              {teamStore.teamList?.map((team) => {
                const favorite = !!favoriteMap[team.id]
                return (
                  <FavoriteTeamItem
                    key={team.id}
                    name={team.name}
                    image={team.logoUrl}
                    favorite={favorite}
                    disabled={!favorite && favoriteTeams.length >= MAX_FAVORITE_COUNT}
                    style={styles.teamListItem}
                    onToggle={(favorite) => onFavoriteToggle(team.id, favorite)}
                  />
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.noteBox}>
          <Text
            style={[styles.text, styles.note]}
            tx={"onboardingCarousel.pickYourFavorites.note"}
            preset="subheading"
          />
        </View>
      </View>
      <View style={styles.buttonPanel}>
        <Button
          onPress={onContinue}
          tx={"onboardingCarousel.pickYourFavorites.actionButtonText"}
          textStyle={styles.actionButtonText}
          pressedStyle={styles.actionButton}
          disabled={favoriteTeams.length === 0}
          style={[
            styles.actionButton,
            favoriteTeams.length === 0 ? styles.actionButtonDisabled : {},
          ]}
        />
      </View>
    </View>
  )
}

export default FavoriteTeamsStep

const useStyles = createUseStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: theme.spacing[24],
    paddingTop: theme.spacing["96"],
    paddingBottom: theme.spacing["32"],
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingBox: {
    width: 300,
    marginBottom: theme.spacing["24"],
  },
  buttonPanel: {},
  text: {
    textAlign: "center",
    ...getTypographyPresets()["h3-bold"],
  },
  note: {
    ...getTypographyPresets()["btn1-bold"],
    lineHeight: 24,
    opacity: 0.5,
    color: theme.colors.text.headline,
    marginBottom: theme.spacing[48],
    marginTop: theme.spacing[8],
  },
  maybeLaterButton: {
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: theme.spacing[24],
  },
  actionButton: {
    borderWidth: 0,
    backgroundColor: theme.colors.primary.main500,
  },
  actionButtonDisabled: {
    backgroundColor: "#E4E7EC",
  },
  actionButtonText: {
    color: "#FFFFFF",
    ...getTypographyPresets()["btn1-bold"],
    lineHeight: 32,
    fontSize: 16,
  },
  teamListContainer: {
    height: 350,
  },
  teamList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 6,
  },
  teamListItem: {
    width: 100,
  },
  noteBox: {
    flex: 1,
    marginTop: theme.spacing["16"],
  },
}))
