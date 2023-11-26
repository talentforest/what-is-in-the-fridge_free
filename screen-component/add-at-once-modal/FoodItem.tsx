import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { getFormattedDate } from '../../util';
import { Food } from '../../constant/foodInfo';
import { useItemSlideAnimation } from '../../hooks';
import { GRAY } from '../../constant/colors';

import CategoryIcon from '../../components/common/CategoryIcon';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  food: Food;
  isEditing: boolean;
  onFoodItemPress: (food: Food) => void;
  active: boolean;
}

export default function FoodItem({
  food,
  isEditing,
  onFoodItemPress,
  active,
}: Props) {
  const { height } = useItemSlideAnimation({
    initialValue: 44,
    toValue: 0,
    active,
  });

  const onItemPress = () => onFoodItemPress(food);

  return (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      <View style={tw`mb-1`}>
        <TouchableOpacity
          key={food.id}
          style={tw.style(
            `bg-white border border-slate-200 rounded-xl h-full flex-row items-center px-2.5 justify-between`,
            shadowStyle(3)
          )}
          onPress={onItemPress}
        >
          <View style={tw`flex-row flex-1 items-center gap-2`}>
            <Icon
              name={isEditing ? 'x' : 'pencil'}
              type='Octicons'
              size={isEditing ? 17 : 13}
              color={GRAY}
            />
            <Text style={tw`flex-1`} numberOfLines={1} ellipsizeMode='tail'>
              {food.name}
            </Text>
          </View>

          <View style={tw`flex-row items-center ml-0.5`}>
            <View style={tw`justify-end items-center flex-row gap-1`}>
              <CategoryIcon category={food.category} size={16} />
              <Text style={tw.style(`text-slate-600`)}>
                {getFormattedDate(food.expiredDate, 'YY.MM.DD')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
