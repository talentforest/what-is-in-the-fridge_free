import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { useFindFood } from '../../hooks';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from './native-component/Icon';
import tw from 'twrnc';
import { shadowStyle } from '../../constant/shadowStyle';

interface Props {
  name: string;
  roundedBorder?: boolean;
  space?: Space;
  navigate?: boolean;
}

export default function IndicatorExist({
  name,
  space,
  navigate,
  roundedBorder,
}: Props) {
  const { findFood } = useFindFood();
  const existFood = findFood(name);

  const navigation = useNavigation<NavigateProp>();

  const dispatch = useDispatch();

  const existFoodColor = existFood ? 'text-blue-600' : 'text-red-500';
  const borderStyle =
    'border h-6.5 border-indigo-100 bg-indigo-50 px-2 rounded-full items-center';

  const onNavigatePress = () => {
    dispatch(search(name));
    return space === '실온보관'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
  };

  return (
    <TouchableOpacity disabled={!navigate} onPress={onNavigatePress}>
      <View
        style={tw.style(
          `flex-row items-center ${navigate ? 'h-full' : ''} 
          ${roundedBorder ? borderStyle : ''}`,
          borderStyle ? shadowStyle(3) : null
        )}
      >
        <Text fontSize={roundedBorder ? 14 : 16} style={tw`${existFoodColor}`}>
          {!!existFood ? '있음' : '없음'}
        </Text>

        {existFood && navigate && (
          <Icon name='arrow-up-right' type='MaterialCommunityIcons' size={12} />
        )}
      </View>
    </TouchableOpacity>
  );
}
