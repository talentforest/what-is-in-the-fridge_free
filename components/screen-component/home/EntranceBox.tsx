import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { Food } from '../../../constant/foods';
import { NavigateProp, RouteName } from '../../../navigation/Navigation';
import { useState } from 'react';
import { LIGHT_YELLOW } from '../../../constant/colors';
import FoodTag from '../../common/Box/FoodBox';
import Title from '../../common/Title';
import Box from '../../common/LayoutBox/Box';
import tw from 'twrnc';
import CheckFoodBox from '../../common/Box/CheckFoodBox';
import MoreOpenBtn from '../../common/Buttons/MoreOpenBtn';
import Icon from '../../native-component/Icon';

export type EntranceTitle =
  | '유통기한 주의 식료품'
  | '자주 먹는 식료품'
  | '장봐야할 식료품';

interface Props {
  foods: Food[];
  info: {
    title: EntranceTitle;
    desc: string;
    iconName: string;
    bgColor: string;
    route: RouteName;
  };
}

export default function EntranceBox({ info, foods }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigation<NavigateProp>();

  const { title, desc, iconName, bgColor, route } = info;

  const MAX_NUM = 6;
  const color = bgColor.slice(3).slice(0, -4);

  return (
    <Box bgColor={bgColor}>
      <Title title={title} iconName={iconName} />
      <Text style={tw`text-white mt-3 mb-1`}>{desc}</Text>

      {foods.length !== 0 ? (
        <View style={tw`flex-1 mt-2`}>
          {title === '장봐야할 식료품' && (
            <View style={tw`flex-row gap-1.5 flex-wrap items-center`}>
              {foods.slice(0, MAX_NUM).map((food) => (
                <CheckFoodBox key={food.id} food={food} />
              ))}
              {isOpen &&
                foods
                  .slice(MAX_NUM)
                  .map((food) => <CheckFoodBox key={food.id} food={food} />)}
              {foods.length > MAX_NUM && (
                <MoreOpenBtn isOpen={isOpen} setIsOpen={setIsOpen} />
              )}
            </View>
          )}
          {(title === '유통기한 주의 식료품' ||
            title === '자주 먹는 식료품') && (
            <View style={tw`flex-row gap-1.5 flex-wrap items-center`}>
              {foods.slice(0, MAX_NUM).map((food) => (
                <FoodTag
                  key={food.id}
                  food={food}
                  expiredDate={title === '유통기한 주의 식료품'}
                />
              ))}
              {foods.length > MAX_NUM && (
                <Icon
                  name='more-horizontal'
                  type='Feather'
                  size={22}
                  color='#fff'
                />
              )}
            </View>
          )}
        </View>
      ) : (
        <Text style={tw`text-${color}-200 text-center py-8`}>
          아직 식료품이 없어요
        </Text>
      )}
      <View style={tw`items-center justify-between flex-row-reverse mt-6`}>
        <TouchableOpacity
          onPress={() => navigate.navigate(route)}
          style={tw`flex-row items-center self-end`}
        >
          <Text style={tw`text-white font-bold`} fontSize={14}>
            더보기
          </Text>
          <Icon
            name='chevron-right'
            type='MaterialCommunityIcons'
            color='#fff'
            size={20}
          />
        </TouchableOpacity>
        {title === '장봐야할 식료품' && (
          <View style={tw`flex-row items-center gap-0.5`}>
            <Icon
              name='information'
              type='MaterialCommunityIcons'
              size={16}
              color={LIGHT_YELLOW}
            />
            <Text style={tw`text-amber-200`}>
              카트에 넣은 식료품을 터치하세요.
            </Text>
          </View>
        )}
      </View>
    </Box>
  );
}
