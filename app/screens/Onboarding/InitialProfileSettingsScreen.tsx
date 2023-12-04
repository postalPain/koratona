import Button from "@stryberventures/gaia-react-native.button"
import Combobox from "@stryberventures/gaia-react-native.combobox"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { useHeader } from "app/utils/useHeader"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import * as yup from "yup"

interface InitialProfileSettingsScreenProps extends AppStackScreenProps<"InitialProfileSettings"> {}

export const InitialProfileSettingsScreen: React.FC<InitialProfileSettingsScreenProps> = observer(
  function InitialProfileSettingsScreen(_props) {
    const styles = useStyles()
    const [disabled, setDisabled] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)

    useHeader({
      leftIcon: "back",
      onLeftPress: () => _props.navigation.pop(),
    })
    // Pull in one of our MST stores
    const { authUser } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const handleSubmitForm = async (values: any) => {
      setIsLoading(true)
      console.log("values", values)
      setTimeout(() => {
        setIsLoading(false)
        _props.navigation.navigate("Demo", { screen:'DemoDebug' })
        authUser.setOnboardingCompleted(true)
      }, 2000)
    }

    return (
      <Screen style={$root} preset="auto">
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <Text style={styles.title} preset="heading" tx="onboardingScreen.yourProfile" />
          <Text style={styles.subTitle} tx="onboardingScreen.moreDetails" />
          <Text style={styles.formTitle} tx="onboardingScreen.personalDetails" weight="semiBold" />
          <Form
            validationSchema={validationSchema}
            onChange={(_, { isValid }) => {
              setDisabled(!isValid)
            }}
            onSubmit={handleSubmitForm}
          >
            <View style={styles.formContent}>
              <View style={styles.inputContainer}>
                <Input
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  keyboardType="default"
                  textContentType="givenName"
                  errorStyle={styles.hintsStyles}
                  hintStyle={styles.hintsStyles}
                />
                <Input
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  keyboardType="default"
                  textContentType="familyName"
                  errorStyle={styles.hintsStyles}
                  hintStyle={styles.hintsStyles}
                />
                <Input
                  name="dob"
                  label="Date of birth"
                  placeholder="Date of birth"
                  errorStyle={styles.hintsStyles}
                  hintStyle={styles.hintsStyles}
                />
                <Input
                  name="phone"
                  label="Phone Number"
                  prefix="+49 "
                  placeholder="000 00000000"
                  mask="XXX XXXXXXXX"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  errorStyle={styles.hintsStyles}
                  hintStyle={styles.hintsStyles}
                />
              </View>
              <Text
                style={styles.formTitle}
                tx="onboardingScreen.chooseYourTeam"
                weight="semiBold"
              />
              <Combobox
                color="primary"
                label="Team"
                noOptionsFoundText="No teams found"
                clearButtonMode="never"
                options={[
                  {
                    label: "New York",
                    value: 1,
                  },
                  {
                    label: "Los Angeles",
                    value: 2,
                  },
                  {
                    label: "Chicago",
                    value: 3,
                  },
                  {
                    label: "Houston",
                    value: 4,
                  },
                  {
                    label: "Philadelphia",
                    value: 5,
                  },
                  {
                    label: "Phoenix",
                    value: 6,
                  },
                  {
                    label: "San Antonio",
                    value: 7,
                  },
                  {
                    label: "San Diego",
                    value: 8,
                  },
                  {
                    label: "Dallas",
                    value: 9,
                  },
                ]}
                placeholder="Chose a city"
                variant="floatingLabel"
              />
              <Button
                type="submit"
                style={{
                  ...styles.button,
                  ...(disabled
                    ? {
                        borderColor: "transparent",
                      }
                    : {
                        backgroundColor: "#333865",
                        borderColor: "#333865",
                      }),
                }}
                disabled={disabled}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text weight="bold" style={styles.loginButtonText}>
                    Join the team
                  </Text>
                )}
              </Button>
            </View>
          </Form>
        </KeyboardAwareScrollView>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 24,
}

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
  },
  button: {
    marginTop: theme.spacing["32"],
    minHeight: 59,
  },
  loginButtonText: {
    color: "#fff",
  },
  hintsStyles: {
    position: "absolute",
    top: -18,
    width: "100%",
  },
  formContent: {
    justifyContent: "space-between",
  },
  inputContainer: {
    gap: 15,
    marginBottom: theme.spacing[40],
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing[12],
  },
  subTitle: {
    textAlign: "center",
    color: "#7D706C",
    marginBottom: theme.spacing[64],
  },
  formTitle: {
    textAlign: "center",
    marginBottom: theme.spacing[8],
    fontSize: 14,
  },
}))

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  phone: yup.string().required("Phone number is required"),
})
