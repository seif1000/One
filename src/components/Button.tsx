import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import {widthToDp} from '../utils/dimensions';

type Props = {
  text: string;
  withIcon: boolean;
  icon?: number;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
  isLoading: boolean;
  disabled: boolean;
  width?: number;
};

export default function Button({
  text,
  textColor,
  isLoading,
  icon,
  backgroundColor,
  onPress,
  disabled,
  withIcon,
  width = widthToDp(95),
}: Props): JSX.Element {
  return (
    <Ripple
      onPress={onPress}
      rippleContainerBorderRadius={widthToDp(1)}
      style={[
        styles.container,
        {backgroundColor: backgroundColor, width: width},
      ]}>
      {isLoading ? (
        <ActivityIndicator color={textColor} animating={true} />
      ) : (
        <>
          {withIcon && icon && <Image source={icon} style={styles.iconStyle} />}
          <Text style={[styles.text, {color: textColor}]}>{text}</Text>
        </>
      )}
    </Ripple>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: widthToDp(2.5),
    height: widthToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthToDp(1),
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    fontSize: widthToDp(4.5),
  },
  iconStyle: {
    width: widthToDp(6),
    height: widthToDp(6),
    marginRight: widthToDp(2),
  },
});
