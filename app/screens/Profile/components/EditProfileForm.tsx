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
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
  View,
} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import SelectDropdown from "react-native-select-dropdown"

type Props = {
  afterSubmit: () => void
  disableBottomSheetInternal?: boolean
}

type Errors = {
  firstName?: string
  lastName?: string
  email?: string
}

type FormFields = {
  firstName?: string
  lastName?: string
  email?: string
}

const EditProfileForm = observer(function ({ afterSubmit, disableBottomSheetInternal }: Props) {
  const styles = useStyles()
  const { shouldHandleKeyboardEvents } = disableBottomSheetInternal
    ? { shouldHandleKeyboardEvents: { value: false } }
    : useBottomSheetInternal()

  const { authUserStore, teamStore } = useStores()
  const user = authUserStore.user

  // Form states
  const lastNameFieldRef = React.useRef<any>()
  const emailFieldRef = React.useRef<any>()
  const initialDateOfBirth = user.dateOfBirth
    ? new Date(user.dateOfBirth)
    : new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  const [dateBirthPickerVisible, setDateBirthPickerVisible] = React.useState<boolean>(false)
  const [dob, setDob] = React.useState<Date>(initialDateOfBirth)
  const [formFields, setFormFields] = React.useState<FormFields>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
  })

  const initialErrorsState = {
    firstName: "",
    lastName: "",
    email: "",
  }
  const [errors, setErrors] = React.useState<Errors>(initialErrorsState)
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    teamStore.selectedFavoriteTeam ||
      ({
        id: -1,
        name: "",
        logoUrl: null,
      } as Team),
  )

  React.useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  React.useEffect(() => {
    const team =
      teamStore.selectedFavoriteTeam.id === 0
        ? teamStore.teamList[0]
        : teamStore.selectedFavoriteTeam
    setSelectedTeam(team)
  }, [teamStore.selectedFavoriteTeam, teamStore.teamList])

  const onDatePickerConfirm: (date?: Date) => void = (selectedDate) => {
    setDateBirthPickerVisible(false)
    if (selectedDate && isValid(new Date(selectedDate))) {
      setDob(selectedDate)
    }
  }

  const getTeamLogoOrPlaceholder = (logo: string | null | undefined) =>
    logo ? { uri: logo } : require("assets/icons/teamsLogo/emptyLogo.png")

  const getEachValueAnCheckEachFieldAndSetErrors = () => ({
    firstName: formFields.firstName ? "" : "This field is required",
    lastName: formFields.lastName ? "" : "This field is required",
    email:
      formFields.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(formFields.email)
        ? ""
        : "This field is required and should be a valid email",
  })

  const filterAndClearNonDirtyData = (data: any) => {
    const newData: any = {}
    Object.keys(data).forEach((key) => {
      const userValue =
        key === "dateOfBirth" && user?.dateOfBirth
          ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
          : (user as any)[key]

      if (data[key] !== userValue) {
        newData[key] = data[key]
      }
    })
    return newData
  }

  const handleSubmitForm = async () => {
    const formErrors = getEachValueAnCheckEachFieldAndSetErrors()
    const isFormInValid = Object.values(formErrors).some(Boolean)

    if (isFormInValid) {
      setErrors(formErrors)
    } else {
      setErrors(initialErrorsState)
    }

    if (authUserStore.isLoading || teamStore.isTeamListLoading || isFormInValid) {
      return
    }
    const data = {
      firstName: formFields?.firstName || "",
      lastName: formFields?.lastName || "",
      email: formFields?.email || "",
      dateOfBirth: format(dob, "yyyy-MM-dd"),
    }
    const filteredData = filterAndClearNonDirtyData(data)
    if (selectedTeam?.id !== teamStore.selectedFavoriteTeam.id) {
      teamStore.addTeamToFavorite(selectedTeam?.id)
    }
    if (Object.keys(filteredData).length === 0) {
      afterSubmit()
      return
    }
    authUserStore.updateUser(filteredData, afterSubmit)
  }

  const onUserInfoInputFieldChange =
    (field: "firstName" | "lastName" | "email") =>
    (value: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setFormFields({
        ...formFields,
        [field]: value.nativeEvent.text,
      })
    }

  const checkIsFieldValid = (field: "firstName" | "lastName" | "email") => {
    const fieldError = errors[field]
    const fieldHasValue = formFields[field]
    if (fieldError && fieldHasValue) {
      setErrors({
        ...errors,
        [field]: "",
      })
    } else if (!fieldError && !fieldHasValue) {
      setErrors({
        ...errors,
        [field]: "This field is required",
      })
    }

    if (field === "email" && fieldHasValue) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!emailPattern.test(fieldHasValue)) {
        setErrors({
          ...errors,
          [field]: "Invalid email format",
        })
      }
    }
  }

  return (
    <View style={styles.formContent}>
      <View style={styles.inputContainer}>
        <Input
          name="firstName"
          label="First name"
          placeholder="First name"
          keyboardType="default"
          textContentType="givenName"
          enablesReturnKeyAutomatically
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameFieldRef.current?.focus()
          }}
          blurOnSubmit={false}
          errorStyle={styles.hintsStyles}
          hintStyle={styles.hintsStyles}
          onFocus={() => {
            shouldHandleKeyboardEvents.value = true
          }}
          error={errors.firstName}
          value={formFields.firstName}
          onChange={onUserInfoInputFieldChange("firstName")}
          onBlur={() => {
            shouldHandleKeyboardEvents.value = false
            checkIsFieldValid("firstName")
          }}
        />
        <Input
          name="lastName"
          label="Last name"
          placeholder="Last name"
          ref={lastNameFieldRef}
          keyboardType="default"
          textContentType="familyName"
          enablesReturnKeyAutomatically
          returnKeyType="next"
          onSubmitEditing={() => {
            emailFieldRef.current?.focus()
          }}
          blurOnSubmit={false}
          errorStyle={styles.hintsStyles}
          hintStyle={styles.hintsStyles}
          error={errors.lastName}
          onFocus={() => {
            shouldHandleKeyboardEvents.value = true
          }}
          value={formFields.lastName}
          onChange={onUserInfoInputFieldChange("lastName")}
          onBlur={() => {
            shouldHandleKeyboardEvents.value = false
            checkIsFieldValid("lastName")
          }}
        />
        <Pressable
          style={styles.datePickerContainer}
          onPress={() => {
            setDateBirthPickerVisible(true)
          }}
        >
          <Text text="Date of birth" style={styles.datePickerLabel} />
          <Text text={format(dob, "dd MMMM yyyy")} style={styles.datePickerText} />
          <DateTimePickerModal
            date={dob}
            onConfirm={onDatePickerConfirm}
            onCancel={() => {
              setDateBirthPickerVisible(false)
            }}
            isVisible={dateBirthPickerVisible}
          />
        </Pressable>
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          keyboardType="email-address"
          ref={emailFieldRef}
          textContentType="emailAddress"
          errorStyle={styles.hintsStyles}
          hintStyle={styles.hintsStyles}
          error={errors.email}
          onFocus={() => {
            shouldHandleKeyboardEvents.value = true
          }}
          value={formFields.email}
          onChange={onUserInfoInputFieldChange("email")}
          onBlur={() => {
            shouldHandleKeyboardEvents.value = false
            checkIsFieldValid("email")
          }}
        />
        <Input
          name="phone"
          label="Phone Number"
          mask="XXX XXXXXXXXX"
          value={user.phone}
          editable={false}
          disabled
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
                source={getTeamLogoOrPlaceholder(selectedTeam?.logoUrl)}
              />
            </View>
            <Text style={styles.teamPickerButtonText} text={selectedTeam?.name || ""} />
          </View>
        )}
        renderCustomizedRowChild={(item: Team) => {
          const isSelected = item.id === selectedTeam?.id
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
                  source={getTeamLogoOrPlaceholder(item?.logoUrl)}
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
