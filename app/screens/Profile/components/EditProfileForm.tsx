import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import Button from "@stryberventures/gaia-react-native.button"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { Team } from "app/models/Team/Team"
import { typography } from "app/theme"
import { format, isValid } from "date-fns"
import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  ActivityIndicator,
  Image,
  InputAccessoryView,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  TextInputChangeEventData,
  View,
} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import SelectDropdown from "react-native-select-dropdown"

type Props = {
  afterSubmit: () => void
}

const EditProfileForm = observer(function ({ afterSubmit }: Props) {
  const styles = useStyles()
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  const { authUserStore, teamStore } = useStores()
  const user = authUserStore.user

  // Form states
  const initialDateOfBirth = user.dateOfBirth
    ? new Date(user.dateOfBirth)
    : new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  const [dateBirthPickerVisible, setDateBirthPickerVisible] = React.useState<boolean>(false)
  const [date, setDate] = React.useState<Date>(initialDateOfBirth)
  const [firstName, setFirstName] = React.useState<string>(user.firstName || "")
  const [lastName, setLastName] = React.useState<string>(user.lastName || "")
  const [email, setEmail] = React.useState<string>(user.email || "")
  const [errors, setErrors] = React.useState<{
    firstName?: string
    lastName?: string
    email?: string
  }>({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    teamStore.selectedFavoriteTeam ||
      ({
        id: -1,
        name: "",
        logoUrl: "",
      } as Team),
  )

  React.useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  React.useEffect(() => {
    setSelectedTeam(teamStore.selectedFavoriteTeam)
  }, [teamStore.selectedFavoriteTeam])

  const onDatePickerConfirm: (date?: Date) => void = (selectedDate) => {
    setDateBirthPickerVisible(false)
    if (selectedDate && isValid(new Date(selectedDate))) {
      setDate(selectedDate)
    }
  }

  const getTeamLogoOrPlaceholder = (logo: string | null) =>
    logo ? { uri: logo } : require("assets/icons/teamsLogo/emptyLogo.png")

  const handleSubmitForm = async () => {
    const isFormValid = Object.values(errors).some(Boolean)

    if (authUserStore.isLoading || teamStore.isTeamListLoading || isFormValid) {
      return
    }
    authUserStore.updateUser(
      {
        firstName,
        lastName,
        email,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      },
      () => {
        if (selectedTeam.id !== teamStore.selectedFavoriteTeam.id) {
          teamStore.addTeamToFavorite(selectedTeam.id, () => {
            afterSubmit()
          })
        } else {
          afterSubmit()
        }
      },
    )
  }

  const onUserInfoInputFieldChange =
    (field: "firstName" | "lastName" | "email") =>
    (value: NativeSyntheticEvent<TextInputChangeEventData>) => {
      switch (field) {
        case "firstName":
          setFirstName(value.nativeEvent.text)
          break
        case "lastName":
          setLastName(value.nativeEvent.text)
          break
        case "email":
          setEmail(value.nativeEvent.text)
          break
        default:
          break
      }
    }
  const checkIsFieldValidOnBlur = (field: "firstName" | "lastName" | "email") => {
    switch (field) {
      case "firstName":
        if (firstName.length < 2) {
          setErrors({
            ...errors,
            firstName: "First name must be at least 2 characters",
          })
        } else {
          setErrors({
            ...errors,
            firstName: "",
          })
        }
        break
      case "lastName":
        if (lastName.length < 2) {
          setErrors({
            ...errors,
            lastName: "Last name must be at least 2 characters",
          })
        } else {
          setErrors({
            ...errors,
            lastName: "",
          })
        }
        break
      case "email":
        if (!/\S+@\S+\.\S+/.test(email)) {
          setErrors({
            ...errors,
            email: "Email is invalid",
          })
        } else {
          setErrors({
            ...errors,
            email: "",
          })
        }
        break
      default:
        break
    }
  }

  return (
    <View>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          {Platform.OS === "ios" && (
            <InputAccessoryView nativeID="firstNameAccessoryId">
              <View style={styles.inputAccessoryBox}>
                <Text
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                  style={styles.inputAccessoryText}
                  tx="common.done"
                  weight="semiBold"
                />
              </View>
            </InputAccessoryView>
          )}
          <Input
            name="firstName"
            label="First name"
            placeholder="First name"
            inputAccessoryViewID="firstNameAccessoryId"
            keyboardType="default"
            textContentType="givenName"
            enablesReturnKeyAutomatically
            errorStyle={styles.hintsStyles}
            hintStyle={styles.hintsStyles}
            onFocus={() => {
              shouldHandleKeyboardEvents.value = true
            }}
            error={errors.firstName}
            value={firstName}
            onChange={onUserInfoInputFieldChange("firstName")}
            onBlur={() => {
              shouldHandleKeyboardEvents.value = false
              checkIsFieldValidOnBlur("firstName")
            }}
          />
          {Platform.OS === "ios" && (
            <InputAccessoryView nativeID="lastNameAccessoryId">
              <View style={styles.inputAccessoryBox}>
                <Text
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                  style={styles.inputAccessoryText}
                  tx="common.done"
                  weight="semiBold"
                />
              </View>
            </InputAccessoryView>
          )}
          <Input
            name="lastName"
            label="Last name"
            placeholder="Last name"
            keyboardType="default"
            textContentType="familyName"
            inputAccessoryViewID="lastNameAccessoryId"
            enablesReturnKeyAutomatically
            errorStyle={styles.hintsStyles}
            hintStyle={styles.hintsStyles}
            error={errors.lastName}
            onFocus={() => {
              shouldHandleKeyboardEvents.value = true
            }}
            value={lastName}
            onChange={onUserInfoInputFieldChange("lastName")}
            onBlur={() => {
              shouldHandleKeyboardEvents.value = false
              checkIsFieldValidOnBlur("lastName")
            }}
          />
          <Pressable
            style={styles.datePickerContainer}
            onPress={() => {
              setDateBirthPickerVisible(true)
            }}
          >
            <Text text="Date of birth" style={styles.datePickerLabel} />
            <Text text={format(date, "dd MMMM yyyy")} style={styles.datePickerText} />
            <DateTimePickerModal
              date={date}
              onConfirm={onDatePickerConfirm}
              onCancel={() => {
                setDateBirthPickerVisible(false)
              }}
              isVisible={dateBirthPickerVisible}
            />
          </Pressable>
          {Platform.OS === "ios" && (
            <InputAccessoryView nativeID="emailAccessoryId">
              <View style={styles.inputAccessoryBox}>
                <Text
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                  style={styles.inputAccessoryText}
                  tx="common.done"
                  weight="semiBold"
                />
              </View>
            </InputAccessoryView>
          )}
          <Input
            name="email"
            label="Email"
            placeholder="Email"
            keyboardType="default"
            textContentType="emailAddress"
            inputAccessoryViewID="emailAccessoryId"
            errorStyle={styles.hintsStyles}
            hintStyle={styles.hintsStyles}
            error={errors.email}
            onFocus={() => {
              shouldHandleKeyboardEvents.value = true
            }}
            value={email}
            onChange={onUserInfoInputFieldChange("email")}
            onBlur={() => {
              shouldHandleKeyboardEvents.value = false
              checkIsFieldValidOnBlur("email")
            }}
          />
          <Input
            name="phone"
            label="Phone Number"
            mask="XXX XXXXXXXXX"
            value={user.phone}
            editable={false}
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
        <Button style={styles.button} onPress={handleSubmitForm}>
          {authUserStore.isLoading || teamStore.isTeamListLoading ? (
            <ActivityIndicator />
          ) : (
            <Text weight="bold" tx="common.saveChanges" style={styles.loginButtonText} />
          )}
        </Button>
      </View>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  formContent: {
    justifyContent: "space-between",
    paddingBottom: theme.spacing[24],
  },
  inputContainer: {
    gap: 15,
    marginBottom: theme.spacing[24],
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
  inputAccessoryBox: {
    backgroundColor: "#F2F3F5",
    paddingVertical: theme.spacing[12],
    justifyContent: "center",
  },
  inputAccessoryText: {
    textAlign: "right",
    fontWeight: "bold",
    color: "#1375FE",
    marginRight: theme.spacing[12],
  },
  button: {
    marginTop: theme.spacing["32"],
    backgroundColor: "#333865",
    borderColor: "#333865",
    minHeight: 58,
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
}))

export default EditProfileForm
