import { ReactNode } from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StatusBar,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';

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
          style={tw`flex-1 p-4 bg-blue-50`}
          keyboardVerticalOffset={60}
        >
          {children}
        </RNKeyboardAvoidingView>
      ) : (
        <View style={tw`flex-1 px-4 bg-blue-50`}>{children}</View>
      )}
    </>
  );
}
