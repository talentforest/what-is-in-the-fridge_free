import { View } from 'react-native';
import { ReactNode } from 'react';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { NavigateProp } from '../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

import ShowMoreBtn from '../../components/buttons/ShowMoreBtn';
import EmptySign from '../../components/common/EmptySign';
import MessageBox from '../../components/common/MessageBox';
import tw from 'twrnc';

interface Props {
  title: '장보기 식료품' | '유통기한 주의 식료품' | '자주 먹는 식료품';
  message: string;
  screen: 'ExpiredFoods' | 'FavoriteFoods' | 'ShoppingList';
  children: ReactNode;
  foodsLength: number;
}

export default function SectionContainer({
  title,
  message,
  children,
  screen,
  foodsLength,
}: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <View style={tw`border-t border-slate-300 pt-7`}>
      <TouchableOpacity
        onPress={() => navigation.navigate(screen)}
        style={tw`flex-row justify-between`}
      >
        <Text style={tw.style(`text-lg text-slate-700`, FontGmarketSansBold)}>
          {title}
        </Text>
        <ShowMoreBtn screen={screen} />
      </TouchableOpacity>
      <MessageBox message={message} />

      {foodsLength !== 0 && <View style={tw`mb-18 min-h-25`}>{children}</View>}

      {foodsLength === 0 && (
        <View
          style={tw`shadow-lg items-center h-40 mt-2 mb-12 border border-slate-300 rounded-xl bg-white justify-center`}
        >
          <EmptySign message={`${title}이 없어요.`} />
        </View>
      )}
    </View>
  );
}
