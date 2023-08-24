import { View } from 'react-native';
import { Text } from '../../native-component';
import { Food } from '../../../constant/foods';
import { RouteName } from '../../../navigation/Navigation';
import { useState } from 'react';
import { LIGHT_YELLOW, YELLOW } from '../../../constant/colors';
import { scaleH } from '../../../util';
import FoodTag from '../../common/boxes/FoodBox';
import Title from '../../common/Title';
import Box from '../../common/layout/Box';
import CheckFoodBox from '../../common/boxes/CheckFoodBox';
import MoreOpenBtn from '../../common/buttons/MoreOpenBtn';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import SeeMoreBtn from '../../common/buttons/SeeMoreBtn';

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

  const { title, desc, iconName, bgColor, route } = info;

  const FOLDED_MAX_NUM = 8;
  const foldedFoods = foods.slice(0, FOLDED_MAX_NUM);

  const color = bgColor.slice(3).slice(0, -4);

  return (
    <Box bgColor={bgColor}>
      <Title title={title} iconName={iconName} />
      <Text style={tw`text-white mt-[${scaleH(6)}px]`} fontSize={13}>
        {desc}
      </Text>
      <View style={tw`min-h-30 mt-[${scaleH(14)}px]`}>
        {foods.length !== 0 ? (
          <View style={tw`flex-row gap-1.5 flex-wrap items-center`}>
            {foldedFoods.map((food) =>
              title === '장봐야할 식료품' ? (
                <CheckFoodBox key={food.id} food={food} />
              ) : (
                <FoodTag
                  key={food.id}
                  food={food}
                  expiredDate={title === '유통기한 주의 식료품'}
                  color={title === '유통기한 주의 식료품' ? 'slate' : 'indigo'}
                />
              )
            )}

            {/* 더보기 indicator */}
            {foods.length > FOLDED_MAX_NUM &&
              (title === '장봐야할 식료품' ? (
                <>
                  {isOpen &&
                    foods
                      .slice(FOLDED_MAX_NUM)
                      .map((food) => (
                        <CheckFoodBox key={food.id} food={food} />
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
          <Text fontSize={14} style={tw`text-${color}-200 text-center pt-10`}>
            아직 식료품이 없어요
          </Text>
        )}
      </View>
      <View style={tw`items-center justify-between flex-row-reverse mt-4`}>
        <SeeMoreBtn route={route} />
        {title === '장봐야할 식료품' && !!foods.length && (
          <View style={tw`flex-row items-center gap-0.5`}>
            <Icon
              name='information'
              type='MaterialCommunityIcons'
              size={13}
              color={YELLOW}
            />
            <Text fontSize={13} style={tw`text-[${YELLOW}]`}>
              카트에 넣은 식료품을 터치하세요.
            </Text>
          </View>
        )}
      </View>
    </Box>
  );
}
