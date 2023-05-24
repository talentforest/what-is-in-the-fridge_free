import { Dimensions, Image, View } from 'react-native';
import { Text } from '../native-component';
import { Food } from '../../constant/foods';
import { cutLetter, getISODate, getLeftDays } from '../../util';
import { useDispatch } from '../../redux/hook';
import { removeFavorite } from '../../redux/slice/favoriteFoodsSlice';
import { editFood } from '../../redux/slice/allFoodsSlice';
import { select } from '../../redux/slice/selectedFoodSlice';
import tw from 'twrnc';
import IconBtn from './IconBtn';
import useRouteName from '../../hooks/useCurrRouteName';
import { ORANGE_RED } from '../../constant/colors';

interface Props {
  food: Food;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function BigFoodTag({ food, setModalVisible }: Props) {
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
        expirationDate: getISODate(new Date()),
        purchaseDate: getISODate(new Date()),
      })
    );
    setModalVisible(true);
  };

  return (
    <View
      key={food.id}
      style={tw`w-[${
        (Dimensions.get('window').width - 44) / 4
      }px] h-24 border bg-white border-slate-300 justify-between gap-0.5 items-center rounded-lg py-2`}
    >
      <View style={tw`h-8 w-6 justify-center`}>
        {food.image.includes('http') ? (
          <Image style={tw`h-5 w-5 rounded-md`} source={{ uri: food.image }} />
        ) : (
          <Text styletw='text-xl pt-0.5'>{food.image}</Text>
        )}
      </View>
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
      </Text>
      {currRoute === 'FavoriteFoods' && (
        <View style={tw`flex-row items-center justify-between w-full p-2`}>
          <IconBtn iconName='pluscircle' onPress={onSelectedPress} size={16} />
          <IconBtn
            iconName='delete'
            onPress={onDeletePress}
            size={16}
            color={ORANGE_RED}
          />
        </View>
      )}
      {currRoute === 'ExpiredFoods' && (
        <Text
          styletw={`text-${
            0 > getLeftDays(food.expirationDate) ? 'red' : 'yellow'
          }-600 text-xs pt-1`}
        >
          {getLeftDays(food.expirationDate)}일
        </Text>
      )}
    </View>
  );
}
