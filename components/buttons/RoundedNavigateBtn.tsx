import { Text, TouchableOpacity } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import { BLUE, GREEN, MEDIUM_BLUE } from '../../constant/colors';

interface Props {
  btnName: string;
  space: Space;
  foodName: string;
  color?: 'cyan' | 'blue' | 'green';
}

export default function RoundedNavigateBtn({
  btnName,
  space,
  foodName,
  color = 'blue',
}: Props) {
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => {
    dispatch(search(foodName));
    return space === '실온보관'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
  };

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw.style(
        `flex-row items-center justify-center bg-${color}-100 rounded-full py-1 pl-2 pr-1.5`,
        shadowStyle(4)
      )}
    >
      <Text
        fontSize={13}
        style={tw.style(`text-${color}-600 leading-4`, { letterSpacing: -0.8 })}
      >
        {btnName}
      </Text>

      <Icon
        name='arrow-up-right'
        type='MaterialCommunityIcons'
        size={12}
        color={
          color === 'cyan' ? MEDIUM_BLUE : color === 'green' ? GREEN : BLUE
        }
      />
    </TouchableOpacity>
  );
}
