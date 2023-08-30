import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { cutLetter } from '../../../util';
import { BLUE } from '../../../constant/colors';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { ReactNode } from 'react';

import CheckBox from '../CheckBox';
import tw from 'twrnc';

interface Props {
  food: Food;
  onCheckBoxPress: (food: Food) => void;
  isCheckedItem: (id: string) => Food | undefined;
  children?: ReactNode;
  disabled?: boolean;
  exist?: boolean;
}

export default function TableItem({
  food,
  onCheckBoxPress,
  isCheckedItem,
  children,
  disabled,
  exist,
}: Props) {
  const { id, name, favorite, category, space } = food;

  const initializedFood = {
    ...initialFoodInfo,
    id,
    name,
    favorite,
    category,
    space,
  };

  const textColor = isCheckedItem(initializedFood.id)
    ? 'text-blue-600'
    : exist
    ? 'text-slate-400'
    : 'text-slate-800';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onCheckBoxPress(initializedFood)}
      style={tw`flex-row items-center gap-3 py-1 h-11.5`}
    >
      <View style={tw`flex-row items-center gap-1.5 flex-1`}>
        <CheckBox
          checked={!!isCheckedItem(initializedFood.id)}
          activeColor={BLUE}
        />
        <View style={tw`flex-1 flex-row items-center gap-2`}>
          <Text style={tw`${exist ? 'max-w-[90%]' : 'flex-1'} ${textColor}`}>
            {cutLetter(initializedFood.name, 34)}
          </Text>
          {exist && (
            <View
              style={tw`border py-0.5 px-1.5 rounded-full bg-stone-100 border-stone-500`}
            >
              <Text style={tw`text-slate-600 text-xs`}>있음</Text>
            </View>
          )}
        </View>
      </View>

      {children}
    </TouchableOpacity>
  );
}
