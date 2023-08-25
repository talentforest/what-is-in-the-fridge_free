import { View } from 'react-native';
import { Text } from '../../native-component';
import { Food } from '../../../constant/foods';
import { RouteName } from '../../../navigation/Navigation';
import { useState } from 'react';
import { YELLOW } from '../../../constant/colors';
import { scaleH } from '../../../util';
import FoodTag from '../../common/boxes/FoodBox';
import Title from '../../common/Title';
import Box from '../../common/layout/Box';
import MoreOpenBtn from '../../common/buttons/MoreOpenBtn';
import Icon from '../../native-component/Icon';
import SeeMoreBtn from '../../common/buttons/SeeMoreBtn';
import tw from 'twrnc';

export type EntranceTitle =
  | '유통기한 주의 식료품'
  | '자주 먹는 식료품'
  | '장보기 목록 식료품';

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
      <View style={tw`min-h-28 mt-[${scaleH(14)}px] mb-3`}>
        {foods.length !== 0 ? (
          <View style={tw`flex-row gap-1 flex-wrap items-center`}>
            {foldedFoods.map((food) => (
              <FoodTag
                key={food.id}
                food={food}
                checkExistence={title === '자주 먹는 식료품'}
                expiredDate={title === '유통기한 주의 식료품'}
              />
            ))}

            {/* 장봐야할 식료품 더보기 indicator */}
            {foods.length > FOLDED_MAX_NUM &&
              (title === '장보기 목록 식료품' ? (
                <>
                  {isOpen &&
                    foods
                      .slice(FOLDED_MAX_NUM)
                      .map((food) => <FoodTag key={food.id} food={food} />)}
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

      {/* 박스 하단 */}
      <View style={tw`items-center justify-between flex-row-reverse`}>
        <SeeMoreBtn route={route} />
        {title === '장보기 목록 식료품' && !!foods.length && (
          <View style={tw`flex-row items-center gap-0.5 pt-3`}>
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
