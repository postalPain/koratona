import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { TouchableOpacity, View } from "react-native"

type PaginationProps = {
  size: number
  paginationIndex: number
}

const Pagination: React.FC<PaginationProps> = ({ size, paginationIndex }) => {
  const styles = useStyles()

  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          style={[styles.pagination, paginationIndex === index ? styles.activeItem : {}]}
          key={index}
        />
      ))}
    </View>
  )
}

export default Pagination

const useStyles = createUseStyles((theme) => ({
  pagination: {
    borderRadius: 2,
    height: theme.spacing[4],
    marginHorizontal: theme.spacing[4],
    width: theme.spacing[4],
    backgroundColor: "#333865",
    opacity: 0.4,
  },
  activeItem: { backgroundColor: "#333865", opacity: 1, width: 6, height: 6, borderRadius: 5 },
  paginationContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
}))
