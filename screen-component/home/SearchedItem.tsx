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
    <View
      style={tw`h-11.2 border-b border-slate-300 px-1 flex-row items-center justify-between`}
    >
      <Text style={tw` text-slate-700 text-sm`}>{cutLetter(name, 13)}</Text>
      <TouchableOpacity
        onPress={() => onNavigatePress(space)} //
        style={tw`flex-row items-center h-full`}
      >
        <Text style={tw` text-slate-500 text-sm`}>
          <Text
            style={tw`${
              space === '팬트리' ? 'text-green-600' : 'text-blue-600'
            } text-sm`}
          >
            {space}
          </Text>{' '}
          {compartmentNum}칸
        </Text>
        <Icon type='MaterialCommunityIcons' name='arrow-top-right' size={18} />
      </TouchableOpacity>
    </View>
  );
}
