import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_BLUE_BG_COLOR } from '../../../constant/colors';
import { BG_COLOR } from '../Container';
import tw from 'twrnc';
import React from 'react';

export function SafeBottomAreaView({ ...props }) {
  const route = useRoute();
  const bgColor =
    route.name === 'Compartments' ? `bg-[${TAB_BLUE_BG_COLOR}]` : BG_COLOR;

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 ${bgColor}`} {...props} />
  );
}
