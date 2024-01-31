import React, { ReactNode } from "react"
import RootSiblingsManager from "react-native-root-siblings"
import { ModalMessage, IModalMessageProps } from "app/components"

export const showModal = (renderModal: (a: () => void) => ReactNode) => {
  let rootNode: any
  const onClose = () => {
    rootNode?.destroy()
    rootNode = null
  }
  rootNode = new RootSiblingsManager(renderModal(onClose))
  return onClose
}

export const showModalMessage = (props: Omit<IModalMessageProps, "onClose">) => {
  showModal((onClose) => <ModalMessage {...props} onClose={onClose} />)
}
