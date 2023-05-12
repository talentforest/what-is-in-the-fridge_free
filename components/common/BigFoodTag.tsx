import { Dimensions, View } from 'react-native';
import { Text } from '../native-component';
import { Food } from '../../constant/foods';
import { cutLetter, getISODate, getLeftDays } from '../../util';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from '../../redux/hook';
import { removeFavorite } from '../../redux/slice/favoriteFoodsSlice';
import { editFood } from '../../redux/slice/allFoodsSlice';
import { RootStackParamList } from '../../navigation/Navigation';
import tw from 'twrnc';
import IconBtn from './IconBtn';

interface Props {
  food: Food;
  setModalVisible: (modalVisible: boolean) => void;
  setSelectedFood: (food: Food) => void;
  editing: boolean;
}

export default function BigFoodTag({
  food,
  setModalVisible,
  setSelectedFood,
  editing,
}: Props) {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name as keyof RootStackParamList;
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
    setSelectedFood({
      ...food,
      expirationDate: getISODate(new Date()),
      purchaseDate: getISODate(new Date()),
    });
    setModalVisible(true);
  };

  return (
    <View
      key={food.id}
      style={tw`w-[${
        (Dimensions.get('window').width - 44) / 4
      }px] h-24 border bg-white border-slate-300 justify-center gap-0.5 items-center rounded-lg p-1`}
    >
      <Text styletw={`text-3xl text-center`}>{food.image}</Text>
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
      </Text>
      {currRoute === 'FavoriteFoods' &&
        (editing ? (
          <IconBtn iconName='delete' onPress={onDeletePress} />
        ) : (
          <IconBtn iconName='pluscircle' onPress={onSelectedPress} />
        ))}
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
