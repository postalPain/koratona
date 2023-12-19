export const getButtonStyle = (disabled: boolean) => {
  if (disabled) {
    return { borderColor: "transparent" }
  } else {
    return { backgroundColor: "#1A1F51", borderColor: "#1A1F51" }
  }
}
