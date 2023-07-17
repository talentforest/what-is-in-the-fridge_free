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
    <View style={tw`mb-8`}>
      <View style={tw`pb-2.5 px-1 border-b border-blue-300`}>
        <Text fontSize={14} style={tw`text-blue-600`}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
