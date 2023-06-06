import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { cutLetter } from '../../util';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { Food } from '../../constant/foods';
import { ReactNode } from 'react';
import { INACTIVE_COLOR } from '../../constant/colors';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

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
      style={tw`h-12 flex-row gap-2 items-center justify-between`}
    >
      <Icon
        name={
          !existInList(food.id) ? 'square-outline' : 'checkbox-marked-outline'
        }
        size={18}
        color={!existInList(food.id) ? INACTIVE_COLOR : INDIGO}
      />
      <View style={tw`flex-1 flex-row items-center gap-2`}>
        {route.name !== 'ShoppingList' &&
          (food.image === '' ? (
            <Icon name='food-variant' size={20} color={LIGHT_GRAY} />
          ) : (
            <Text styletw='text-lg'>{food.image}</Text>
          ))}
        <Text styletw='flex-1 text-sm'>{cutLetter(food.name, 28)}</Text>
      </View>
      <View style={tw`w-22 items-end`}>{children}</View>
    </TouchableOpacity>
  );
}
