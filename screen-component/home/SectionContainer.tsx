import { View } from 'react-native';
import { ReactNode } from 'react';
import { Text } from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { GRAY } from '../../constant/colors';

import ShowMoreBtn from '../../components/buttons/ShowMoreBtn';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: '장보기 목록' | '유통기한 주의 식료품' | '자주 먹는 식료품';
  message: string;
  screen: 'ExpiredFoods' | 'FavoriteFoods' | 'ShoppingList';
  children: ReactNode;
}

export default function SectionContainer({
  title,
  message,
  children,
  screen,
}: Props) {
  return (
    <View>
      <Text style={tw.style(`text-lg text-slate-700`, FontGmarketSansBold)}>
        {title}
      </Text>
      <View style={tw`flex-row items-start gap-1 my-1`}>
        <View style={tw`mt-1.4`}>
          <Icon
            type='MaterialCommunityIcons'
            name='message-outline'
            size={14}
            color={GRAY}
          />
        </View>
        <Text style={tw`text-sm text-slate-500 flex-1`}>{message}</Text>
      </View>

      {children}

      <View style={tw`self-end h-11 items-end justify-end`}>
        <ShowMoreBtn screen={screen} />
      </View>
    </View>
  );
}
