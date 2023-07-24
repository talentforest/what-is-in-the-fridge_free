import { Dimensions, Platform } from 'react-native';

const { width: DeviceWidth } = Dimensions.get('screen');

const baseWidth = 375;

export const scaleFont = (size: number) => {
  const android = Platform.OS === 'android';
  const setWidth = DeviceWidth > 700 ? 300 : baseWidth;

  const ratio = DeviceWidth / setWidth;
  const sizeByRatio = size * ratio;
  const scaledSize = android ? sizeByRatio * 0.7 : sizeByRatio;

  return Math.round(scaledSize);
};

export const scaleH = (size: number) => (DeviceWidth / baseWidth) * size;

// 기기 너비의 비율에 따라 fontSize를 계산하여 반환하는 함수
export const responsiveFontSize = (size: number) => {
  const windowWidth = Dimensions.get('window').width;
  const ratio = windowWidth / baseWidth;
  const responsiveSize = Math.round(size * ratio);

  return Platform.OS === 'ios'
    ? responsiveSize
    : Math.round(responsiveSize / 1.1); // Android에서 약간의 보정을 위해 1.1로 나누어 줍니다.
};
