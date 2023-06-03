import { View } from 'react-native';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';

export default function SettingContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={tw`mb-6`}>
      <View style={tw`p-2 border-b border-slate-300`}>
        <Text styletw='text-xs text-indigo-600'>{title}</Text>
      </View>
      {children}
    </View>
  );
}
