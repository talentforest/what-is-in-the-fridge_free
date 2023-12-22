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
    <View
      style={tw`gap-1.5 self-center flex-row justify-center items-center border-slate-300 mb-4 mt-2 py-1.5 px-2.5`}
    >
      <LineDeco />

      <TouchableOpacity
        style={tw`p-0.5`}
        onPress={() => {
          !!favFood
            ? dispatch(removeFavorite(favFood.name))
            : dispatch(addFavorite({ ...formFood }));
        }}
      >
        <Icon
          type='Octicons'
          name={favFood ? 'star-fill' : 'star'}
          size={15}
          color={favFood ? YELLOW : LIGHT_GRAY}
        />
      </TouchableOpacity>

      <Text
        fontSize={18}
        style={tw.style(`max-w-4/5 text-stone-800 leading-5`)}
      >
        {name}
      </Text>

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
