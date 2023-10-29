import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { getFormattedDate } from '../../util';
import { Food } from '../../constant/foodInfo';

import { useSlideAnimation } from '../../hooks';
import { INDIGO } from '../../constant/colors';
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
  const { height } = useSlideAnimation({
    initialValue: 48,
    toValue: 0,
    active,
  });

  return (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      <View style={tw`mb-1`}>
        <TouchableOpacity
          key={food.id}
          style={tw.style(
            `bg-white border border-slate-300 rounded-md h-full flex-row items-center px-2.5 justify-between`,
            shadowStyle(3)
          )}
          onPress={() => onFoodItemPress(food)}
        >
          <View style={tw`flex-row flex-1 items-center gap-3`}>
            <Icon
              name={isEditing ? 'x' : 'edit'}
              type='Feather'
              size={isEditing ? 16 : 14}
              color={INDIGO}
            />
            <Text
              style={tw`text-[15px] flex-1`}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {food.name}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-1.5 ml-0.5`}>
            <CategoryIcon category={food.category} size={16} />
            <View style={tw`w-15 items-end`}>
              <Text
                style={tw.style(`text-sm text-slate-600`, {
                  letterSpacing: -0.5,
                })}
              >
                {getFormattedDate(food.expiredDate, 'YY.MM.DD')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
