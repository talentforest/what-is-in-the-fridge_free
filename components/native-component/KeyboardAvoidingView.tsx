import { ReactNode } from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import { PlatformIOS, statusBarHeight } from '../../constant/statusBarHeight';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export function KeyboardAvoidingView({ children }: Props) {
  const iosOffset = 40 + (statusBarHeight || 0);

  return (
    <RNKeyboardAvoidingView
      behavior={PlatformIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={PlatformIOS ? iosOffset : 0}
      style={tw`flex-1 bg-blue-50`}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
}
