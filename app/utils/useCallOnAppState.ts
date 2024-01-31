import { useEffect, useCallback } from "react"
import { AppState } from "react-native"

export const useCallOnAppState = (state: string, cb: () => void, deps: Array<any>) => {
  const wrappedCallback = useCallback(cb, deps)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === state) {
        wrappedCallback()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [...deps])
}
