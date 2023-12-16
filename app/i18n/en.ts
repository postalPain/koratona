const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    and: " & ",
    login: "Login",
    backToLogin: "Back to Login",
    skipText: "Maybe later",
  },
  policies: {
    agreement: "By creating an account, you agree to our",
    privacy: " Privacy Policy",
    terms: "Terms of Service",
  },
  welcomeScreen: {
    slogan: "Engage with your team like never before.",
    joinApp: "Join Koratona",
  },
  signUp: {
    slogan: "Be part of your favorite club",
    signUp: "Create Account",
  },
  signIn: {
    slogan: "Welcome back",
    forgotPassword: "Reset password",
  },
  forgotPassword: {
    slogan: "Password reset",
    hint: "Email password reset link",
  },
  resetPassword: {
    slogan: "Create new password",
    passwordFieldLabel: "New password",
    repeatPasswordField: "Repeat new password",
    savePassword: "Save password",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },

  onboardingScreen: {
    yourProfile: "Your profile",
    moreDetails: "We need a few more details so we can complete your fan profile",
    personalDetails: "Personal details",
    firstName: "First name",
    lastName: "Last name",
    DOB: "Date of birth",
    phoneNumber: "Phone number",
    chooseYourTeam: "Choose your team",
    join: "Join the",
  },

  onboardingCarousel: {
    getExclusiveAccess: {
      heading: "Get exclusive access",
      subHeading: "Stay in the game with instant scores, highlights, and breaking news",
      actionButtonText: "Continue",
    },
    pickYourFavorites: {
      heading: "Pick your favorites",
      subHeading: "Stay in the game with instant scores, highlights, and breaking news",
      actionButtonText: "Continue",
    },
    neverMissABeat: {
      heading: "Never miss a beat",
      subHeading: "Unlock the ultimate fan experience and enjoy exclusive perks",
      actionButtonText: "Enable notifications",
      skipButton: "Maybe later",
    },
    setProfile: {
      heading: "Never miss a beat",
      subHeading: "Unlock the ultimate fan experience and enjoy exclusive perks",
      actionButtonText: "Set up profile",
    },
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  appHomeNavigator: {
    home: "Home",
    experiences: "Experiences",
    userProfile: "Profile",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
}

export default en
export type Translations = typeof en
