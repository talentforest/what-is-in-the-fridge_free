import { Text, TouchableOpacity } from '../common/native-component';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { BLUE, GREEN, MEDIUM_BLUE } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  space: Space;
  foodName: string;
  color?: 'cyan' | 'blue' | 'emerald';
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
        `flex-row items-center justify-center bg-${color}-50 rounded-full py-1.5 pl-2 pr-1.5`
      )}
    >
      <Text
        fontSize={13}
        style={tw.style(`text-${color}-600 leading-4`, {
          letterSpacing: btnName === '있음' ? 0 : -1,
        })}
      >
        {btnName}
      </Text>

      <Icon
        name='arrow-up-right'
        type='MaterialCommunityIcons'
        size={11}
        color={
          color === 'cyan' ? MEDIUM_BLUE : color === 'emerald' ? GREEN : BLUE
        }
      />
    </TouchableOpacity>
  );
}
