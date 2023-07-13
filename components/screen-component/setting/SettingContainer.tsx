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
      <View style={tw`pb-2.5 px-1 border-b border-blue-300`}>
        <Text style={tw`text-slate-600`} fontSize={12}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
