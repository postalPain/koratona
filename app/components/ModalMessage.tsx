import React, { FC, useRef, useMemo } from "react"
import { Modal, View } from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme";
import Text from "@stryberventures/gaia-react-native.text";
import Button from "@stryberventures/gaia-react-native.button";
import ExclamationIcon from '../../assets/icons/svgs/ExclamationIcon';
import NetworkOffIcon from '../../assets/icons/svgs/NetworkOffIcon';
import { translate } from "../i18n";
import { typography } from "app/theme";

type TIcon = 'exclamation' | 'offline';
const icons: Record<TIcon, FC> = {
  exclamation: ExclamationIcon,
  offline: NetworkOffIcon,
};

export interface IModalMessageProps {
  icon?: TIcon;
  title: string;
  description: string;
  button?: string;
  onClose: () => void;
}

export const ModalMessage: FC<IModalMessageProps> = ({
 icon,
 title,
 description,
 button = translate("modals.general.button"),
 onClose,
}) => {
  const styles = useStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const Icon = typeof icon === 'string' ? icons[icon as TIcon] : undefined;

  const onButtonPress = () => {
    onClose();
  };

  return (
    <Modal transparent={true}>
      <View  style={styles.shadowScreen}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          bottomInset={20}
          detached={true}
          style={styles.sheetContainer}
          backgroundStyle={styles.sheetContainerBg}
          handleIndicatorStyle={styles.handleIndicator}
          enablePanDownToClose
          onClose={onButtonPress}
        >
          <View style={styles.container}>
            {!!Icon && (
              <View style={styles.iconBox}>
                <Icon />
              </View>
            )}
            <Text style={styles.header}>
              {title}
            </Text>
            <Text style={styles.description}>
              {description}
            </Text>
            <Button onPress={onButtonPress} style={styles.button}>
              {button}
            </Button>
          </View>
        </BottomSheet>
      </View>
    </Modal>
  )
};

const useStyles = createUseStyles((theme) => ({
  shadowScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 390,
    padding: theme.spacing["24"],
    backgroundColor: '#fff',
  },
  sheetContainer: {
    marginHorizontal: theme.spacing["24"],
  },
  sheetContainerBg: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  iconBox: {
    marginTop: theme.spacing["64"],
    marginBottom: theme.spacing["24"],
  },
  header: {
    marginBottom: theme.spacing["8"],
    textAlign: 'center',
    fontFamily: typography.fonts.instrumentSansSemiCondensed.semiBold,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.36,
    color: '#121212',
  },
  description: {
    marginBottom: theme.spacing["64"],
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#606770',
  },
  button: {
    width: '100%',
  },
  handleIndicator: {
    width: 50,
    height: 6,
    borderRadius: 10,
    backgroundColor: theme.colors.primary.light200,
  },
}));
