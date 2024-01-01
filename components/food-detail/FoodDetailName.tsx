import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { useFindFood } from '../../hooks';
import { LIGHT_GRAY, YELLOW } from '../../constant/colors';
import { useDispatch, useSelector } from '../../redux/hook';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/slice/food-list/favoriteFoodsSlice';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function FoodDetailName({ name }: { name: string }) {
  const { formFood } = useSelector((state) => state.formFood);
  const { isFavoriteItem } = useFindFood();

  const dispatch = useDispatch();

  const favFood = isFavoriteItem(name);

  return (
    <View style={tw`self-center mt-5`}>
      <LineDeco />

      <TouchableOpacity
        onPress={() => {
          !!favFood
            ? dispatch(removeFavorite(favFood.name))
            : dispatch(addFavorite({ ...formFood }));
        }}
        style={tw`flex-row items-center gap-1 py-2 px-3`}
      >
        <Icon
          type='Octicons'
          name={favFood ? 'star-fill' : 'star'}
          size={15}
          color={favFood ? YELLOW : LIGHT_GRAY}
        />

        <Text fontSize={18} style={tw.style(`text-stone-800 leading-5`)}>
          {name}
        </Text>
      </TouchableOpacity>
      <LineDeco reverse />
    </View>
  );
}

function LineDeco({ reverse }: { reverse?: boolean }) {
  return (
    <View
      style={tw.style(
        `absolute ${reverse ? 'bottom-0 right-0' : 'top-0 left-0'} w-4.5 h-2.5`,
        {
          transform: [{ rotate: reverse ? '180deg' : '0deg' }],
        }
      )}
    >
      <View
        style={tw`w-full h-0.6 bg-indigo-200 rounded-full rounded-bl-none`}
      />
      <View style={tw`w-0.6 h-full bg-indigo-200 rounded-b-full`} />
    </View>
  );
}
