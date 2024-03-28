import { useTheme } from "@stryberventures/gaia-react-native.theme"
import { useStores } from "app/models"
import { useEffect } from "react"

const defaultPreset = {
  tshirt: require("assets/images/tShirt.png"),
  primary: {
    main500: "#1983FF",
    gradientMiddle: "#333865",
    dark600: "rgba(250, 223, 215, 0)",
    light100: "#FADFD7",
  },
  secondary: {
    main500: "#ffffff",
    dark600: "#333865",
    light200: "#ffffff",
  },
}

const TEAMS_THEME_PRESET: { [key: number]: any } = {
  14: {
    name: "Al Hilal",
    tshirt: require("assets/images/tShirt.png"),
    primary: defaultPreset.primary,
    secondary: defaultPreset.secondary,
  },
  10: {
    name: "Al Ittihad",
    tshirt: require("assets/images/tshirh-ittihad.png"),
    primary: {
      main500: "#FDF100",
      gradientMiddle: "#1E1E1D",
      dark600: "rgba(253, 241, 0, 0.8)",
    },
    secondary: {
      light200: "#F1F7B2",
      dark600: "#383838",
    },
  },
  9: {
    name: "Al Nassr",
    tshirt: require("assets/images/tshirh-alnassr.png"),
    primary: {
      main500: "#FFD02D",
      gradientMiddle: "#07213C",
      dark600: "#FFD02D",
    },
    secondary: {
      light200: "#B2D5F7",
      dark600: "#07213C",
    },
  },
  7: {
    name: "Al Ahli",
    tshirt: require("assets/images/tshirh-alahli.png"),
    primary: {
      main500: "#008C60",
      gradientMiddle: "#233B6E",
      dark600: "#008C60"
    },
    secondary: {
      light200: "#C8F7B2",
      dark600: "#196454",
    },
  },
}

export const useUpdateThemeBasedOnTeam = () => {
  const { theme, updateTheme } = useTheme()
  const { teamStore } = useStores()

  const usersFavoriteTeam = (teamStore.selectedFavoriteTeam || teamStore.teamList[0])?.id
  const themePreset = TEAMS_THEME_PRESET[usersFavoriteTeam] || defaultPreset

  useEffect(() => {
    updateTheme({
      ...theme,
      profileTShirt:themePreset.tshirt,
      colors: {
        ...theme.colors,
        primary: {
          ...theme.colors.primary,
          ...themePreset.primary,
        },
        secondary: {
          ...theme.colors.secondary,
          ...themePreset.secondary,
        },
      },
    })
  }, [usersFavoriteTeam])
}
