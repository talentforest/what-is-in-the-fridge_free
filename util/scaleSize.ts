import { Dimensions, Platform } from 'react-native';

const { width: DeviceWidth } = Dimensions.get('screen');

const baseWidth = 375;

// 기기의 높이를 기준으로 크기를 계산하여 반환하는 함수
export const scaleH = (size: number) => (DeviceWidth / baseWidth) * size;

// 기기 너비의 비율에 따라 fontSize를 계산하여 반환하는 함수
export const responsiveFontSize = (size: number) => {
  const windowWidth = Dimensions.get('window').width;
  const ratio = windowWidth / baseWidth;
  const responsiveSize = Math.round(size * ratio);

  return Platform.OS === 'ios'
    ? responsiveSize
    : Math.round(responsiveSize / 1.1);
};
