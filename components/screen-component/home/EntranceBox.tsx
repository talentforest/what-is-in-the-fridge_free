import { View } from 'react-native';
import { Text } from '../../native-component';
import { Food } from '../../../constant/foods';
import { RouteName } from '../../../navigation/Navigation';
import { useState } from 'react';
import FoodTag from '../../common/Box/FoodBox';
import Title from '../../common/Title';
import Box from '../../common/LayoutBox/Box';
import tw from 'twrnc';
import RoundedFullBtn from '../../common/Buttons/RoundedFullBtn';
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

  const { title, desc, iconName, bgColor, route } = info;

  const MAX_NUM = 6;
  const color = bgColor.slice(3).slice(0, -4);

  return (
    <Box bgColor={bgColor}>
      <Title title={title} iconName={iconName} />
      <Text style={tw`text-white my-3`}>{desc}</Text>

      {foods.length !== 0 ? (
        <View style={tw`flex-row gap-1.5 flex-wrap flex-1 mt-2 items-center`}>
          {title === '장봐야할 식료품' && (
            <>
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
            </>
          )}
          {(title === '유통기한 주의 식료품' ||
            title === '자주 먹는 식료품') && (
            <>
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
            </>
          )}
        </View>
      ) : (
        <Text style={tw`text-${color}-200 text-center py-8`}>
          아직 식료품이 없어요
        </Text>
      )}
      <RoundedFullBtn title='더보기' route={route} iconName='chevron-right' />
    </Box>
  );
}
