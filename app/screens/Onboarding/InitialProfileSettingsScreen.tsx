import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { useHeader } from "app/utils/useHeader"
import { format, isValid } from "date-fns"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, Platform, Pressable, View, ViewStyle } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import SelectDropdown from "react-native-select-dropdown"
import * as yup from "yup"

const teams = [
  "Manchester United",
  "Manchester City",
  "Liverpool",
  "Chelsea",
  "Arsenal",
  "Tottenham",
  "Leicester City",
  "West Ham United",
  "Everton",
  "Aston Villa",
  "Leeds United",
  "Newcastle United",
  "Wolverhampton Wanderers",
  "Crystal Palace",
  "Southampton",
  "Brighton & Hove Albion",
  "Burnley",
]

interface InitialProfileSettingsScreenProps extends AppStackScreenProps<"InitialProfileSettings"> {}

export const InitialProfileSettingsScreen: React.FC<InitialProfileSettingsScreenProps> = observer(
  function InitialProfileSettingsScreen(_props) {
    const styles = useStyles()
    const [disabled, setDisabled] = React.useState(true)

    const { authUser } = useStores()
    const [date, setDate] = React.useState<Date>(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    )
    const [selectedTeam, setSelectedTeam] = React.useState<string>("Manchester United")

    useHeader({
      leftIcon: "back",
      onLeftPress: () => _props.navigation.pop(),
    })

    const handleSubmitForm = async (values: {
      firstName: string
      lastName: string
      dob: string
      phone: string
    }) => {
      authUser.updateUser({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      })
    }

    const onDOBFieldChange: (event: DateTimePickerEvent, date?: Date) => void = (
      event,
      selectedDate,
    ) => {
      if (selectedDate && isValid(new Date(selectedDate))) {
        setDate(selectedDate)
      }
    }

    return (
      <Screen style={$root} preset="auto">
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
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
                <Pressable
                  style={styles.datePickerContainer}
                  onPress={() => {
                    if (Platform.OS === "android") {
                      DateTimePickerAndroid.open({
                        value: date,
                        onChange: onDOBFieldChange,
                      })
                    }
                  }}
                >
                  <Text text="Date of birth" style={styles.datePickerLabel} />
                  {Platform.OS === "android" && (
                    <Text text={format(date, "dd MMMM yyyy")} style={styles.datePickerText} />
                  )}
                  {Platform.OS === "ios" && (
                    <DateTimePicker
                      value={date}
                      onChange={onDOBFieldChange}
                      style={styles.datePicker}
                      maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    />
                  )}
                </Pressable>

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
              <SelectDropdown
                data={teams}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setSelectedTeam(selectedItem)
                }}
                defaultValueByIndex={0}
                buttonStyle={styles.teamPickerButton}
                buttonTextStyle={styles.teamPickerButtonText}
                dropdownStyle={styles.teamPickerDropdown}
                renderCustomizedButtonChild={() => (
                  <View style={styles.teamPickerButtonListItem}>
                    <Icon icon="alhilal" />
                    <Text style={styles.teamPickerButtonText} text={selectedTeam} />
                  </View>
                )}
                renderCustomizedRowChild={(item) => {
                  const isSelected = item === selectedTeam
                  return (
                    <View
                      style={[
                        styles.teamPickerButtonListItem,
                        isSelected ? styles.teamPickerListItemSelected : {},
                      ]}
                    >
                      <Icon icon="alhilal" />
                      <Text
                        text={item}
                        style={[
                          styles.teamPickerButtonText,
                          isSelected ? styles.teamPickerListItemTextSelected : {},
                        ]}
                      />
                    </View>
                  )
                }}
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
                {authUser.isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text weight="bold" style={styles.loginButtonText}>
                    Join the team {selectedTeam}
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
    textAlign: "center",
  },
  hintsStyles: {
    position: "absolute",
    top: -18,
    width: "100%",
  },
  formContent: {
    justifyContent: "space-between",
    paddingBottom: theme.spacing[40],
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
    marginBottom: theme.spacing[32],
  },
  formTitle: {
    textAlign: "center",
    fontSize: 14,
  },
  datePicker: {
    marginBottom: -20,
  },
  datePickerContainer: {
    width: "100%",
    height: 58,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
  },
  datePickerLabel: {
    fontSize: 12,
    color: "#475567",
    position: "absolute",
    top: 0,
    left: theme.spacing[12],
  },
  datePickerText: {
    fontSize: 16,
    color: "#101828",
    marginLeft: theme.spacing[12],
    marginTop: theme.spacing[12],
  },
  teamPickerButton: {
    width: "100%",
    height: 58,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
  },
  teamPickerButtonText: {
    fontSize: 16,
    color: "#202223",
    marginLeft: theme.spacing[12],
  },
  teamPickerButtonListItem: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: theme.spacing[12],
  },
  teamPickerListItemSelected: {
    backgroundColor: "#333865",
  },
  teamPickerListItemTextSelected: {
    color: "#fff",
  },

  teamPickerDropdown: {
    borderRadius: 10,
  },
}))

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
})
