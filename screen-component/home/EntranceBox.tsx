import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foods';
import { NavigateProp, RouteName } from '../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FontGmarketSansBold } from '../../constant/fonts';
import { GRAY } from '../../constant/colors';

import FoodTagBox from './FoodTagBox';
import MoreOpenBtn from '../../components/buttons/MoreOpenBtn';
import Icon from '../../components/common/native-component/Icon';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';
import SeeMoreBtn from '../../components/buttons/SeeMoreBtn';

export type EntranceTitle =
  | '유통기한 주의 식료품'
  | '자주 먹는 식료품'
  | '장보기 목록 식료품';

export type BoxColor = 'amber' | 'indigo' | 'slate' | 'blue';

interface Props {
  foods: Food[];
  info: {
    title: EntranceTitle;
    desc: string;
    iconName: string;
    route: RouteName;
  };
  color: BoxColor;
}

export default function EntranceBox({ info, foods, color = 'slate' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NavigateProp>();

  const FOLDED_MAX_NUM = 8;
  const foldedFoods = foods.slice(0, FOLDED_MAX_NUM);

  const { title, desc, iconName, route } = info;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      style={tw`shadow-md bg-white flex-1 mb-3 border border-slate-500 rounded-xl`}
    >
      {/* 박스 헤더 */}
      <View style={tw`rounded-t-xl bg-${color}-100`}>
        <View style={tw`flex-row items-center gap-1 px-4 pt-2.5`}>
          {iconName && (
            <Icon
              type='MaterialCommunityIcons'
              name={iconName}
              size={18}
              color={color}
            />
          )}
          <Text
            style={tw.style(
              `text-white text-lg text-${color}-600`,
              FontGmarketSansBold
            )}
          >
            {title}
          </Text>
        </View>
        <Text style={tw`text-${color}-700 px-4 mb-2 text-sm`}>{desc}</Text>
      </View>
      <View style={tw`p-3 border-t border-slate-500`}>
        {/* 태그 리스트 */}
        <View style={tw`min-h-28 mb-3`}>
          {foods.length !== 0 ? (
            <View style={tw`flex-row gap-1 flex-wrap items-center`}>
              {foldedFoods.map((food) => (
                <FoodTagBox
                  key={food.id}
                  food={food}
                  checkExistence={title === '자주 먹는 식료품'}
                  expiredDate={title === '유통기한 주의 식료품'}
                />
              ))}

              {foods.length > FOLDED_MAX_NUM &&
                (title === '장보기 목록 식료품' ? (
                  <>
                    {/* 장봐야할 식료품 펼치기 indicator */}
                    {isOpen &&
                      foods
                        .slice(FOLDED_MAX_NUM)
                        .map((food) => (
                          <FoodTagBox key={food.id} food={food} />
                        ))}
                    <MoreOpenBtn isOpen={isOpen} setIsOpen={setIsOpen} />
                  </>
                ) : (
                  <View style={tw`flex-row items-center px-1`}>
                    <Icon
                      name='more-horizontal'
                      type='Feather'
                      size={22}
                      color='#fff'
                    />
                    <View
                      style={tw`flex-row items-center py-1 px-2 rounded-full`}
                    >
                      <Icon name='add' type='Ionicons' size={16} color='#fff' />
                      <Text style={tw`text-white`}>
                        {foods.slice(FOLDED_MAX_NUM).length}개
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          ) : (
            <View style={tw`items-center justify-center flex-1`}>
              <EmptySign message='아직 식료품이 없어요.' color={color} />
            </View>
          )}
        </View>

        {/* 박스 하단 */}
        <SeeMoreBtn />
      </View>
    </TouchableOpacity>
  );
}
