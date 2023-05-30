import { ReactNode } from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StatusBar,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';
import { BG_LIGHT_GRAY } from '../../constant/colors';

interface Props {
  children: ReactNode;
}

export function KeyboardAvoidingView({ children }: Props) {
  const PlatformIOS = Platform.OS === 'ios';
  const statusBarHeight = PlatformIOS
    ? getStatusBarHeight(true)
    : StatusBar.currentHeight;

  return (
    <>
      {PlatformIOS ? (
        <RNKeyboardAvoidingView
          behavior='padding'
          style={tw`flex-1 bg-[${BG_LIGHT_GRAY}] pt-[${
            (statusBarHeight || 0) + 14
          }px]`}
          keyboardVerticalOffset={0}
        >
          {children}
        </RNKeyboardAvoidingView>
      ) : (
        <View
          style={tw`flex-1 bg-[${BG_LIGHT_GRAY}] px-4 pt-[${
            (statusBarHeight || 0) + 14
          }px]`}
        >
          {children}
        </View>
      )}
    </>
  );
}
