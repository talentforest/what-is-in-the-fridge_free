import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { cutLetter } from '../../util';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { Food } from '../../constant/foodInfo';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { MEDIUM_GRAY } from '../../constant/colors';

import CategoryIcon from '../../components/common/CategoryIcon';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function SearchedItem({ food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { name, space, category } = food;

  const dispatch = useDispatch();

  const onNavigatePress = (space: Space) => {
    dispatch(search(name));
    return space === '실온보관'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
  };

  return (
    <TouchableOpacity
      onPress={() => onNavigatePress(space)}
      style={tw`h-13 bg-blue-50 shadow-md rounded-xl px-2.5 py-1.5 justify-between`}
    >
      <View style={tw`flex-row items-center gap-1`}>
        <CategoryIcon category={category} size={12} />
        <Text style={tw`text-slate-700`}>{cutLetter(name, 11)}</Text>
      </View>

      <View style={tw`flex-row items-center`}>
        <Text fontSize={14} style={tw`text-slate-500`}>
          {space}
        </Text>
        <Icon
          type='MaterialCommunityIcons'
          name='arrow-up-right'
          size={13}
          color={MEDIUM_GRAY}
        />
      </View>
    </TouchableOpacity>
  );
}
