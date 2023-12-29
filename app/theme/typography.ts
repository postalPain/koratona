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

// Instrumental Sans

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

// Instrumental Sans SemiCondensed
// @ts-ignore
import instrumentalSansSemiCondensedRegular from "assets/fonts/instrumentalSansSemiCondensed/InstrumentSans_SemiCondensed-Regular.ttf"
// @ts-ignore
import instrumentalSansSemiCondensedBold from "assets/fonts/instrumentalSansSemiCondensed/InstrumentSans_SemiCondensed-Bold.ttf"
// @ts-ignore
import instrumentalSansSemiCondensedMedium from "assets/fonts/instrumentalSansSemiCondensed/InstrumentSans_SemiCondensed-Medium.ttf"
// @ts-ignore
import instrumentalSansSemiCondensedSemiBold from "assets/fonts/instrumentalSansSemiCondensed/InstrumentSans_SemiCondensed-SemiBold.ttf"
// @ts-ignore
import instrumentalSansSemiCondensedRegularItalic from "assets/fonts/instrumentalSansSemiCondensed/InstrumentSans_SemiCondensed-Italic.ttf"

// Instrumental Sans Condensed
// @ts-ignore
import instrumentalSansCondensedRegular from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-Regular.ttf"
// @ts-ignore
import instrumentalSansCondensedBold from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-Bold.ttf"
// @ts-ignore
import instrumentalSansCondensedMedium from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-Medium.ttf"
// @ts-ignore
import instrumentalSansCondensedSemiBold from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-SemiBold.ttf"
// @ts-ignore
import instrumentalSansCondensedSemiBoldItalic from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-SemiBoldItalic.ttf"
// @ts-ignore
import instrumentalSansCondensedRegularItalic from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-Italic.ttf"

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
  // Instrumental Sans,
  instrumentalSansRegular,
  instrumentalSansBold,
  instrumentalSansMedium,
  instrumentalSansSemiBold,
  instrumentalSansRegularItalic,
  // Instrumental Sans SemiCondensed,
  instrumentalSansSemiCondensedRegular,
  instrumentalSansSemiCondensedBold,
  instrumentalSansSemiCondensedMedium,
  instrumentalSansSemiCondensedSemiBold,
  instrumentalSansSemiCondensedRegularItalic,
  // Instrumental Sans Condensed,
  instrumentalSansCondensedRegular,
  instrumentalSansCondensedBold,
  instrumentalSansCondensedMedium,
  instrumentalSansCondensedSemiBold,
  instrumentalSansCondensedSemiBoldItalic,
  instrumentalSansCondensedRegularItalic,
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
    regularItalic: "instrumentalSansRegularItalic",
  },
  instrumentSansSemiCondensed: {
    regular: "instrumentalSansSemiCondensedRegular",
    bold: "instrumentalSansSemiCondensedBold",
    medium: "instrumentalSansSemiCondensedMedium",
    semiBold: "instrumentalSansSemiCondensedSemiBold",
    regularItalic: "instrumentalSansSemiCondensedRegularItalic",
  },
  instrumentSansCondensed: {
    regular: "instrumentalSansCondensedRegular",
    bold: "instrumentalSansCondensedBold",
    medium: "instrumentalSansCondensedMedium",
    semiBold: "instrumentalSansCondensedSemiBold",
    semiBoldItalic: "instrumentalSansCondensedSemiBoldItalic",
    regularItalic: "instrumentalSansCondensedRegularItalic",
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
