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
import { search } from '../../redux/slice/searchedFoodSlice';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { GRAY } from '../../constant/colors';

interface Props {
  food: Food;
}

export default function SearchedItem({ food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { name, space, compartmentNum } = food;

  const dispatch = useDispatch();

  const onNavigatePress = (space: Space) => {
    dispatch(search(name));
    return space === '팬트리'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
  };

  return (
    <TouchableOpacity
      onPress={() => onNavigatePress(space)}
      style={tw`h-14 bg-white shadow-md rounded-lg px-2 justify-center`}
    >
      <Text style={tw` text-slate-700 text-sm`}>{cutLetter(name, 11)}</Text>
      <View style={tw`flex-row items-center justify-end`}>
        <Text style={tw` text-slate-500 text-sm`}>
          <Text style={tw`text-blue-600 text-xs`}>{space}</Text>
        </Text>
        <Icon type='MaterialCommunityIcons' name='arrow-top-right' size={12} />
      </View>
    </TouchableOpacity>
  );
}
