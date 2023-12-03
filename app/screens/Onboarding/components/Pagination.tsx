import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

const styles = StyleSheet.create({
  pagination: {
    borderRadius: 2,
    height: 4,
    marginHorizontal: 4,
    width: 4,
  },
  paginationContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
})

type PaginationProps = {
  size: number
  paginationIndex: number
}

const Pagination: React.FC<PaginationProps> = ({ size, paginationIndex }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          style={[
            styles.pagination,
            paginationIndex === index
              ? { backgroundColor: "#7D706C", width: 6, height: 6, borderRadius: 5 }
              : { backgroundColor: "#7D706C", opacity: 0.4 },
          ]}
          key={index}
        />
      ))}
    </View>
  )
}

export default Pagination
