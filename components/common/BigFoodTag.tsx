import { Dimensions, View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Food } from '../../constant/foods';
import { cutLetter, getISODate, getLeftDays } from '../../util';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

interface Props {
  food: Food;
  setModalVisible?: (modalVisible: boolean) => void;
  setSelectedFood?: (food: Food) => void;
}

export default function BigFoodTag({
  food,
  setModalVisible,
  setSelectedFood,
}: Props) {
  const navigation = useNavigation();

  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name;

  return (
    <View
      key={food.id}
      style={tw`w-[${
        (Dimensions.get('window').width - 44) / 4
      }px] h-24 border bg-white border-slate-300 justify-center items-center rounded-lg p-1`}
    >
      <Text styletw={`text-3xl text-center`}>{food.image}</Text>
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
      </Text>
      {currRoute === 'Favorite' && setSelectedFood && setModalVisible ? (
        <TouchableOpacity
          style={tw`self-end absolute bottom-0.5 right-0.5`}
          onPress={() => {
            setSelectedFood({
              ...food,
              expirationDate: getISODate(new Date()),
              purchaseDate: getISODate(new Date()),
            });
            setModalVisible(true);
          }}
        >
          <Icon name='pluscircle' size={20} color='#6e69ff' />
        </TouchableOpacity>
      ) : (
        <Text
          styletw={`text-xs pt-1 ${
            0 > getLeftDays(food.expirationDate)
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {getLeftDays(food.expirationDate)}일
        </Text>
      )}
    </View>
  );
}
