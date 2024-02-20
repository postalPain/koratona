// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import {
  Inter_700Bold as interBold,
  Inter_300Light as interLight,
  Inter_500Medium as interMedium,
  Inter_400Regular as interRegular,
  Inter_600SemiBold as interSemiBold,
} from "@expo-google-fonts/inter"
import {
  NotoSansArabic_700Bold as notoSansArabicBold,
  NotoSansArabic_500Medium as notoSansArabicMedium,
  NotoSansArabic_400Regular as notoSansArabicRegular,
  NotoSansArabic_600SemiBold as notoSansArabicSemiBold,
} from "@expo-google-fonts/noto-sans-arabic"
import { Platform, TextStyle } from "react-native"
import { isRTL } from "app/i18n"

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
// @ts-ignore
import instrumentalSansCondensedBoldItalic from "assets/fonts/instrumentalSansCondensed/InstrumentSans_Condensed-BoldItalic.ttf"

// General Sans

// @ts-ignore
import generalSansRegular from "assets/fonts/generalSans/GeneralSans-Regular.otf"
// @ts-ignore
import generalSansMedium from "assets/fonts/generalSans/GeneralSans-Medium.otf"
// @ts-ignore
import generalSansSemibold from "assets/fonts/generalSans/GeneralSans-Semibold.otf"

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
  instrumentalSansCondensedRegularItalic,
  instrumentalSansCondensedSemiBoldItalic,
  instrumentalSansCondensedBoldItalic,
  // General Sans,
  generalSansRegular,
  generalSansMedium,
  generalSansSemibold,
  // Noto Sans Arabic
  notoSansArabicRegular,
  notoSansArabicMedium,
  notoSansArabicSemiBold,
  notoSansArabicBold,
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
    regularItalic: "instrumentalSansCondensedRegularItalic",
    medium: "instrumentalSansCondensedMedium",
    semiBold: "instrumentalSansCondensedSemiBold",
    semiBoldItalic: "instrumentalSansCondensedSemiBoldItalic",
    bold: "instrumentalSansCondensedBold",
    boldItalic: "instrumentalSansCondensedBoldItalic",
  },
  generalSans: {
    regular: "generalSansRegular",
    medium: "generalSansMedium",
    semiBold: "generalSansSemibold",
  },
  notoSansArabic: {
    regular: "notoSansArabicRegular",
    medium: "notoSansArabicMedium",
    semiBold: "notoSansArabicSemiBold",
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

const fontDependOnLanguage = isRTL() ? "notoSansArabic" : "generalSans"

export const typographyPresets: Record<string, TextStyle> = {
  "h3-bold": {
    fontFamily: typography.fonts[fontDependOnLanguage].semiBold,
    fontSize: 32,
    lineHeight: isRTL() ? 48 : 36,
  },
  "h4-bold": {
    fontFamily: typography.fonts[fontDependOnLanguage].semiBold,
    fontSize: 24,
    lineHeight: isRTL() ? 34 : 28,
  },
  "p1-regular": {
    fontFamily: typography.fonts[fontDependOnLanguage].regular,
    fontSize: 16,
  },
  "p1-medium": {
    fontFamily: typography.fonts[fontDependOnLanguage].medium,
    fontSize: 16,
  },
  "p2-regular": {
    fontFamily: typography.fonts[fontDependOnLanguage].regular,
    fontSize: 14,
  },
  "p2-medium": {
    fontFamily: typography.fonts[fontDependOnLanguage].medium,
    fontSize: 14,
  },
  "p2-semibold": {
    fontFamily: typography.fonts[fontDependOnLanguage].semiBold,
    fontSize: 14,
  },
  "p3-regular": {
    fontFamily: isRTL() ? typography.fonts.notoSansArabic.regular : typography.fonts.inter.normal,
    fontSize: 12,
  },
  "p3-semibold": {
    fontFamily: typography.fonts[fontDependOnLanguage].semiBold,
    fontSize: 12,
  },
  "btn1-bold": {
    fontFamily: typography.fonts[fontDependOnLanguage].semiBold,
    fontSize: 16,
  },
}
