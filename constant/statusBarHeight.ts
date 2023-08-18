import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const PlatformIOS = Platform.OS === 'ios';

export const statusBarHeight = PlatformIOS
  ? getStatusBarHeight(true)
  : StatusBar.currentHeight;
