import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import {
  NavigateProp,
  RootStackParamList,
} from '../../../navigation/Navigation';
import { ReactNode } from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

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
      style={tw`min-h-36 border border-slate-300 flex-1 rounded-lg p-3 bg-white`}
      onPress={() => navigation.navigate(destination)}
    >
      <Text styletw='text-sm text-indigo-600 mb-2'>{title}</Text>
      {children}
      <View
        style={tw`flex-row justify-end items-center self-end absolute top-0 bottom-0 right-1`}
      >
        <Icon name='chevron-right' size={25} color='#4a46e5' />
      </View>
    </TouchableOpacity>
  );
}
