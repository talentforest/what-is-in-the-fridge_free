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
    <View style={tw`my-3`}>
      <View style={tw`py-2 border-b border-slate-300`}>
        <Text style={tw`text-indigo-600`} fontSize={12}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
