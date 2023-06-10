import { Dimensions } from 'react-native';

const { width: DimensionsWidth } = Dimensions.get('window');

const baseWidth = 375;

export const scaleFont = (size: number) => {
  const setWidth = DimensionsWidth > 700 ? 700 : baseWidth;

  const ratio = DimensionsWidth / setWidth;
  const scaledSize = size * ratio;

  return Math.ceil(scaledSize);
};

export const scaleH = (size: number) => (DimensionsWidth / baseWidth) * size;
