import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { cutLetter, scaleH } from '../../util';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { Food } from '../../constant/foods';
import { ReactNode } from 'react';
import { INACTIVE_COLOR } from '../../constant/colors';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

interface Props {
  food: Food;
  onCheckPress: (food: Food) => void;
  existInList: (id: string) => Food | undefined;
  children: ReactNode;
}

export default function TableItem({
  food,
  onCheckPress,
  existInList,
  children,
}: Props) {
  const route = useRoute();

  return (
    <TouchableOpacity
      onPress={() => onCheckPress(food)}
      style={tw`flex-row gap-2 items-center justify-between h-[${scaleH(
        43
      )}px]`}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={
          !existInList(food.id) ? 'square-outline' : 'checkbox-marked-outline'
        }
        size={18}
        color={!existInList(food.id) ? INACTIVE_COLOR : INDIGO}
      />
      <View style={tw`flex-1 flex-row items-center gap-2`}>
        {route.name !== 'ShoppingList' &&
          (food.image === '' ? (
            <Icon
              type='MaterialCommunityIcons'
              name='food-outline'
              size={20}
              color={LIGHT_GRAY}
            />
          ) : (
            <Text fontSize={16}>{food.image}</Text>
          ))}
        <Text fontSize={14}>{cutLetter(food.name, 28)}</Text>
      </View>
      <View style={tw`items-end`}>{children}</View>
    </TouchableOpacity>
  );
}
