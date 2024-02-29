import React, { FC } from "react"
import { View, ViewStyle, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import HartIcon from 'assets/icons/svgs/HartIcon';
import { typographyPresets } from "app/theme"

interface IFavoriteTeamItemProps {
  name: string;
  image?: string | null;
  favorite?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onToggle: (active: boolean) => void;
}
const FavoriteTeamItem: FC<IFavoriteTeamItemProps> = ({
  name,
  image,
  favorite,
  disabled,
  style,
  onToggle,
}) => {
  const styles = useStyles();
  const onFavoritePress = () => {
    onToggle(!favorite)
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageBox}>
        <Grayscale style={styles.imageFilter} amount={favorite ? 0 : 1}>
          <Image
            source={{ uri: image ?? undefined }}
            resizeMode="contain"
            style={styles.image}
          />
        </Grayscale>
      </View>
      <View style={styles.labelContainer}>
        <Text numberOfLines={2} style={styles.label}>{ name }</Text>
      </View>
      <TouchableOpacity
        hitSlop={20}
        disabled={disabled}
        onPress={onFavoritePress}
      >
        <HartIcon filled={favorite} />
      </TouchableOpacity>
    </View>
  )
};

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
  imageBox: {
    width: 65,
    height: 65,
    padding: 10,
  },
  imageFilter: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  labelContainer: {
    flexGrow: 1,
  },
  label: {
    ...typographyPresets["p2-semibold"],
    marginBottom: theme.spacing["12"],
    lineHeight: 20,
    textAlign: 'center',
  },
}));

export default FavoriteTeamItem;
