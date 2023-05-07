import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import {
  NavigateProp,
  RootStackParamList,
} from '../../../navigation/Navigation';
import { ReactNode } from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title: EntranceTitle;
  destination: keyof RootStackParamList;
  children: ReactNode;
}

type EntranceTitle =
  | '나의 냉장고'
  | '나의 장바구니 목록'
  | '유통기한이 임박한 식료품'
  | '자주 먹는 식료품';

export default function EntranceBox({ title, destination, children }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      style={tw`border border-slate-300 flex-1 justify-between rounded-lg p-3 bg-white`}
      onPress={() => navigation.navigate(destination)}
    >
      <Text styletw='text-sm text-indigo-600'>{title}</Text>
      {children}
      <View style={tw`flex-row justify-end items-center self-end`}>
        <Icon name='keyboard-arrow-right' size={24} color='#4f46e5' />
      </View>
    </TouchableOpacity>
  );
}
