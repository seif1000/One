import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const widthToDp = (number: number): number => {
  const actualwidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * actualwidth) / 100);
};

export const heightToDp = (number: number): number => {
  const actualHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * actualHeight) / 100);
};
