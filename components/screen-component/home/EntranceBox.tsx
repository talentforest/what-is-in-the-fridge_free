import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import {
  NavigateProp,
  RootStackParamList,
} from '../../../navigation/Navigation';
import { ReactNode } from 'react';
import { DEEP_INDIGO, ORANGE_RED } from '../../../constant/colors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  title: EntranceTitle;
  destination: keyof RootStackParamList;
  children: ReactNode;
}

type EntranceTitle = '유통기한 주의 식료품' | '자주 먹는 식료품';

export default function EntranceBox({ title, destination, children }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      style={tw`mb-2 min-h-30 border border-slate-300 flex-1 rounded-lg p-3 bg-white`}
      onPress={() => navigation.navigate(destination)}
    >
      <View style={tw`flex-row items-center mb-2 gap-1`}>
        <Icon
          name={title === '유통기한 주의 식료품' ? 'alert-triangle' : 'heart'}
          size={16}
          color={ORANGE_RED}
        />
        <Text styletw='text-sm text-indigo-600'>{title}</Text>
      </View>
      {children}
      <View
        style={tw`flex-row justify-end items-center self-end absolute top-0 bottom-0 right-1`}
      >
        <Icon name='chevron-right' size={20} color={DEEP_INDIGO} />
      </View>
    </TouchableOpacity>
  );
}
