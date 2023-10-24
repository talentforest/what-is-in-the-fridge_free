import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { useFindFood } from '../../hooks';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/searchedFoodSlice';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from './native-component/Icon';
import tw from 'twrnc';

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
  const navigation = useNavigation<NavigateProp>();
  const { findFood } = useFindFood();
  const dispatch = useDispatch();
  const existFood = findFood(name);

  const existFoodColor = existFood ? 'text-blue-600' : 'text-red-500';
  const borderStyle =
    'border border-blue-400 px-2 h-7.5 rounded-full items-center';

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(search(name));
        return space === '팬트리'
          ? navigation.navigate('PantryFoods')
          : navigation.navigate('Compartments', { space });
      }}
      disabled={!navigate}
    >
      <View style={tw`${roundedBorder ? borderStyle : ''} items-end`}>
        <View
          style={tw`flex-row items-center -gap-0.2 ${navigate ? 'h-full' : ''}`}
        >
          <Text
            style={tw`${existFoodColor} py-0 ${
              roundedBorder ? 'text-[13px] ' : 'text-[15px]'
            }`}
          >
            {!!existFood ? '있음' : '없음'}
          </Text>

          {existFood && navigate && (
            <Icon name='arrow-up-right' type='Feather' size={15} />
          )}
        </View>

        {space && existFood && !borderStyle && (
          <Text style={tw`text-xs text-slate-500 py-0`}>{space}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
