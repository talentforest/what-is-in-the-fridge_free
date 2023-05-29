import { Dimensions, Image, View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Food } from '../../constant/foods';
import { cutLetter, getISODate, getLeftDays } from '../../util';
import { useDispatch } from '../../redux/hook';
import { removeFavorite } from '../../redux/slice/favoriteFoodsSlice';
import { editFood } from '../../redux/slice/allFoodsSlice';
import { DEEP_INDIGO, ORANGE_RED } from '../../constant/colors';
import { select } from '../../redux/slice/selectedFoodSlice';
import IconBtn from './IconBtn';
import useRouteName from '../../hooks/useRouteName';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  food: Food;
  setModalVisible?: (modalVisible: boolean) => void;
}

export default function FavoriteFoodItem({ food, setModalVisible }: Props) {
  const { currRoute } = useRouteName();
  const dispatch = useDispatch();

  const onDeletePress = () => {
    dispatch(
      editFood({
        foodId: food.id,
        editedFood: { ...food, favorite: false },
      })
    );
    dispatch(removeFavorite({ name: food.name }));
  };

  const onSelectedPress = () => {
    dispatch(
      select({
        ...food,
        expiredDate: getISODate(new Date()),
        purchaseDate: getISODate(new Date()),
      })
    );
    if (setModalVisible) {
      setModalVisible(true);
    }
  };

  return (
    <View
      style={tw`flex-row px-4 border bg-white border-slate-300 justify-between gap-2 items-center rounded-lg py-0.5`}
    >
      <Icon name='checkcircleo' size={16} color={ORANGE_RED} />
      <View style={tw`h-8 w-6 justify-center`}>
        {food.image.includes('http') ? (
          <Image style={tw`h-5 w-5 rounded-md`} source={{ uri: food.image }} />
        ) : (
          <Text styletw='text-xl pt-0.5'>{food.image}</Text>
        )}
      </View>
      <Text styletw={'text-slate-600 flex-1'}>{food.name}</Text>
      {currRoute === 'FavoriteFoods' && (
        <TouchableOpacity
          onPress={onSelectedPress}
          style={tw`gap-1 flex-row items-center justify-between`}
        >
          <Icon name='plus' size={18} color={DEEP_INDIGO} />
          <Icon name='square' size={16} color={DEEP_INDIGO} />
        </TouchableOpacity>
      )}
    </View>
  );
}
