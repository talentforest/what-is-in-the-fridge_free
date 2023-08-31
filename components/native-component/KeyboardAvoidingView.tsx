import { ReactNode } from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import { PlatformIOS, statusBarHeight } from '../../constant/statusBarHeight';
import { useRoute } from '@react-navigation/native';
import { BG_COLOR } from '../common/Container';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export function KeyboardAvoidingView({ children }: Props) {
  const route = useRoute();
  const tabOffset = route.name === 'ShoppingList' ? 40 : 5;
  const iosOffset = tabOffset + (statusBarHeight || 0);

  return (
    <RNKeyboardAvoidingView
      behavior={PlatformIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={PlatformIOS ? iosOffset : 0}
      style={tw`flex-1 ${BG_COLOR}`}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
}
