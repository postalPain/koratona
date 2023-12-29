import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { Team } from "app/models/Team/Team"
import { typography } from "app/theme"
import { format, isValid } from "date-fns"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, Image, Platform, Pressable, View } from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import * as yup from "yup"

type Props = {
  onCloseBottomSheet: () => void
}

export const EditProfile: React.FC<Props> = observer(function (_props) {
  const styles = useStyles()
  const [disabled, setDisabled] = React.useState(true)
  const { authUserStore, teamStore } = useStores()
  const user = authUserStore.user

  const [date, setDate] = React.useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
  )
  const [selectedTeam, setSelectedTeam] = React.useState<Team>({
    id: -1,
    name: "",
    logoUrl: "",
  } as Team)

  const handleSubmitForm = async (values: {
    firstName: string
    lastName: string
    dob: string
    phone: string
  }) => {
    authUserStore.updateUser(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
      _props.onCloseBottomSheet,
    )
  }

  const onDOBFieldChange: (event: DateTimePickerEvent, date?: Date) => void = (
    event,
    selectedDate,
  ) => {
    if (selectedDate && isValid(new Date(selectedDate))) {
      setDate(selectedDate)
    }
  }

  const getTeamLogoOrPlaceholder = (logo: string | null) =>
    logo ? { uri: logo } : require("assets/icons/teamsLogo/emptyLogo.png")

  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  React.useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.editProfile" />
      <Form
        validationSchema={validationSchema}
        onChange={(_, { isValid }) => {
          setDisabled(!isValid)
        }}
        onSubmit={handleSubmitForm}
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          dob: format(date, "dd MMMM yyyy"),
          phone: user?.phone || "",
        }}
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
              onFocus={() => {
                shouldHandleKeyboardEvents.value = true
              }}
              onBlur={() => {
                shouldHandleKeyboardEvents.value = false
              }}
            />
            <Input
              name="lastName"
              label="Last name"
              placeholder="Last name"
              keyboardType="default"
              textContentType="familyName"
              errorStyle={styles.hintsStyles}
              hintStyle={styles.hintsStyles}
              onFocus={() => {
                shouldHandleKeyboardEvents.value = true
              }}
              onBlur={() => {
                shouldHandleKeyboardEvents.value = false
              }}
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
              onFocus={() => {
                shouldHandleKeyboardEvents.value = true
              }}
              onBlur={() => {
                shouldHandleKeyboardEvents.value = false
              }}
            />
          </View>
          <Text style={styles.formTitle} tx="profile.yourTeam" weight="semiBold" />
          <SelectDropdown
            data={teamStore.teamList}
            onSelect={(selectedItem) => {
              setSelectedTeam(selectedItem)
            }}
            defaultValueByIndex={0}
            buttonStyle={styles.teamPickerButton}
            buttonTextStyle={styles.teamPickerButtonText}
            dropdownStyle={styles.teamPickerDropdown}
            renderCustomizedButtonChild={() => (
              <View style={styles.teamPickerButtonListItem}>
                <View style={styles.teamPickerButtonListItemLogo}>
                  <Image
                    width={25}
                    height={25}
                    resizeMode="contain"
                    source={getTeamLogoOrPlaceholder(selectedTeam.logoUrl)}
                  />
                </View>
                <Text style={styles.teamPickerButtonText} text={selectedTeam.name} />
              </View>
            )}
            renderCustomizedRowChild={(item: Team) => {
              const isSelected = item.id === selectedTeam.id
              return (
                <View
                  style={[
                    styles.teamPickerButtonListItem,
                    isSelected ? styles.teamPickerListItemSelected : {},
                  ]}
                >
                  <View style={styles.teamPickerButtonListItemLogo}>
                    <Image
                      width={25}
                      height={25}
                      resizeMode="contain"
                      source={getTeamLogoOrPlaceholder(item.logoUrl)}
                    />
                  </View>
                  <Text
                    text={item.name}
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
            {authUserStore.isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text weight="bold" tx="common.saveChanges" style={styles.loginButtonText} />
            )}
          </Button>
        </View>
      </Form>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
  },
  button: {
    marginTop: theme.spacing["32"],
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
    paddingBottom: theme.spacing[24],
  },
  inputContainer: {
    gap: 15,
    marginBottom: theme.spacing[24],
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  subTitle: {
    textAlign: "center",
    color: "#7D706C",
    marginBottom: theme.spacing[32],
  },
  formTitle: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 16.8,
    marginBottom: theme.spacing[12],
    fontFamily: typography.fonts.instrumentSans.semiBold,
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
  teamPickerButtonListItemLogo: {
    height: 25,
    width: 25,
    overflow: "hidden",
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
  phone: yup.string().length(12, "Phone number is invalid").required("Phone number is required"),
})
