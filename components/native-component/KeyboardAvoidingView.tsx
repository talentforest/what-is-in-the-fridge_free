import { ReactNode } from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import { PlatformIOS, statusBarHeight } from '../../constant/statusBarHeight';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export function KeyboardAvoidingView({ children }: Props) {
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
          behavior='height'
          style={tw`flex-1 bg-blue-50 border`}
          keyboardVerticalOffset={-200}
        >
          {children}
        </RNKeyboardAvoidingView>
      )}
    </>
  );
}
