import { ReactNode } from 'react';
import {
  Dimensions,
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

  const relativePaddingAndroid = Dimensions.get('screen').height / 8.2;

  return (
    <>
      {PlatformIOS ? (
        <RNKeyboardAvoidingView
          behavior='padding'
          style={tw`flex-1 bg-blue-50`}
          keyboardVerticalOffset={40 + (statusBarHeight || 0)}
        >
          {children}
        </RNKeyboardAvoidingView>
      ) : (
        <RNKeyboardAvoidingView
          behavior='padding'
          style={tw`flex-1 bg-blue-50`}
          keyboardVerticalOffset={-relativePaddingAndroid}
        >
          {children}
        </RNKeyboardAvoidingView>
      )}
    </>
  );
}
