import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "@stryberventures/gaia-react-native.button"
import Form, { IFormActions } from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { Team } from "app/models/Team/Team"
import useFetchFavoriteTeam from "app/screens/hooks/useGetFavoriteTeam"
import useFetchTeamList from "app/screens/hooks/useTeamList"
import { typography } from "app/theme"
import { format, isValid } from "date-fns"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import {
  ActivityIndicator,
  Image,
  InputAccessoryView,
  Keyboard,
  Pressable,
  View,
} from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import * as yup from "yup"

type Props = {
  onCloseBottomSheet: () => void
}

export const EditProfile: React.FC<Props> = observer(function (_props) {
  const styles = useStyles()
  const { authUserStore, teamStore } = useStores()
  const user = authUserStore.user

  const [date, setDate] = React.useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
  )

  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    teamStore.selectedFavoriteTeam ||
      ({
        id: -1,
        name: "",
        logoUrl: "",
      } as Team),
  )
  const [dateBirthPickerVisible, setDateBirthPickerVisible] = React.useState<boolean>(false);

  useFetchTeamList()
  useFetchFavoriteTeam()

  useEffect(() => {
    setSelectedTeam(teamStore.selectedFavoriteTeam)
  }, [teamStore.selectedFavoriteTeam])
  const onDatePickerConfirm: (date?: Date) => void = (selectedDate) => {
    setDateBirthPickerVisible(false);

  };
  const onDatePickerCancel = () => {
    setDateBirthPickerVisible(false);
  };

  const getTeamLogoOrPlaceholder = (logo: string | null) =>
    logo ? { uri: logo } : require("assets/icons/teamsLogo/emptyLogo.png")

  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  React.useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  const handleSubmitForm = async (
    values: {
      firstName: string
      lastName: string
      dob: string
      phone: string
    },
    formActions: IFormActions,
  ) => {
    if (!formActions.isValid || authUserStore.isLoading || teamStore.isTeamListLoading) {
      return
    }
    authUserStore.updateUser(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
      () => {
        teamStore.addTeamToFavorite(selectedTeam.id, () => {
          _props.onCloseBottomSheet()
        })
      },
    )
  }

  const onDateBirthPress = () => {
    setDateBirthPickerVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.editProfile" />
      <Form
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          dob: isValid(new Date(date)) ? format(date, "dd MMMM yyyy") : "",
          phone: user?.phone || "",
        }}
      >
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <InputAccessoryView nativeID={"firstNameAccessoryId"}>
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
            <Input
              name="firstName"
              label="First name"
              placeholder="First name"
              inputAccessoryViewID="firstNameAccessoryId"
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
            <InputAccessoryView nativeID={"lastNameAccessoryId"}>
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
            <Input
              name="lastName"
              label="Last name"
              placeholder="Last name"
              keyboardType="default"
              textContentType="familyName"
              inputAccessoryViewID="lastNameAccessoryId"
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
              onPress={onDateBirthPress}
            >
              <Text text="Date of birth" style={styles.datePickerLabel} />
              <Text text={format(date, "dd MMMM yyyy")} style={styles.datePickerText} />
              <DateTimePickerModal
                date={date}
                onConfirm={onDatePickerConfirm}
                onCancel={onDatePickerCancel}
                isVisible={dateBirthPickerVisible}
              />
            </Pressable>
            <InputAccessoryView nativeID={"telephoneNumber01"}>
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
            <Input
              name="phone"
              label="Phone Number"
              placeholder="000 00000000"
              mask="XXX XXXXXXXX"
              autoComplete="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              errorStyle={styles.hintsStyles}
              inputAccessoryViewID="telephoneNumber01"
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
          {!teamStore.isTeamListLoading && (
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
          )}
          <Button type="submit" style={styles.button}>
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
}))

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().length(12, "Phone number is invalid").required("Phone number is required"),
})
