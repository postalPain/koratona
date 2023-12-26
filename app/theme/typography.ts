// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter"

// @ts-ignore
import instrumentalSansRegular from "assets/fonts/instrumentalSans/InstrumentSans-Regular.ttf"
// @ts-ignore
import instrumentalSansBold from "assets/fonts/instrumentalSans/InstrumentSans-Bold.ttf"
// @ts-ignore
import instrumentalSansMedium from "assets/fonts/instrumentalSans/InstrumentSans-Medium.ttf"
// @ts-ignore
import instrumentalSansSemiBold from "assets/fonts/instrumentalSans/InstrumentSans-SemiBold.ttf"
// @ts-ignore
import instrumentalSansRegularItalic from "assets/fonts/instrumentalSans/InstrumentSans-Italic.ttf"

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
  instrumentalSansRegular,
  instrumentalSansBold,
  instrumentalSansMedium,
  instrumentalSansSemiBold,
  instrumentalSansRegularItalic
}

const fonts = {
  inter: {
    // Cross-platform Google font.
    light: "interLight",
    normal: "interRegular",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
  instrumentSans: {
    regular: "instrumentalSansRegular",
    bold: "instrumentalSansBold",
    medium: "instrumentalSansMedium",
    semiBold: "instrumentalSansSemiBold",
    regularItalic: "instrumentalSansRegularItalic"
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.inter,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
