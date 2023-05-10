import { Food } from '../../constant/foods';
import { getISODate } from '../../util';
import { Alert, Dimensions, View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Space, SpaceName } from '../../constant/fridge';
import { useDispatch } from '../../redux/hook';
import { addFood } from '../../redux/slice/allFoodsSlice';
import RNModal from './component/Modal';
import tw from 'twrnc';
import UUIDGenerator from 'react-native-uuid';
import useCheckFood from '../../hooks/useCheckFood';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  food: Food;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}
export default function FoodSpaceModal({
  food,
  modalVisible,
  setModalVisible,
}: Props) {
  const { checkExistFood } = useCheckFood();
  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const onSubmit = (space: Space) => {
    if (checkExistFood(food)) {
      return Alert.alert(
        `${food.name}`,
        `${food.space} ${food.compartmentNum}에 이미 식료품이 있습니다.`
      );
    }

    const favoriteFoodInfo: Food = {
      ...food,
      expirationDate: getISODate(new Date()),
      purchaseDate: getISODate(new Date()),
      space,
      compartmentNum: '1번',
      id: myUuid as string,
    };

    dispatch(addFood(favoriteFoodInfo));
    Alert.alert(`${food.name} 추가`, `${space} 1번에 추가되었습니다.`);
    setModalVisible(false);
  };

  return (
    <RNModal
      title='냉장고에 자주 먹는 식료품 추가하기'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <View style={tw`mt-4 flex-row flex-wrap w-full justify-between gap-1`}>
        <Text styletw='text-rose-600 mb-2'>
          * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
        </Text>
        {SpaceName.map((space) => (
          <TouchableOpacity
            key={space}
            onPress={() => onSubmit(space)}
            style={tw`flex-row h-16 w-[${
              (Dimensions.get('window').width - 36) / 2
            }px] rounded-md justify-center items-center bg-indigo-600`}
          >
            <Icon
              name={space.includes('냉동') ? 'fridge-bottom' : 'fridge-top'}
              size={24}
              color={space.includes('냉장') ? '#ffd51b' : '#13c0ff'}
            />
            <Text
              styletw={`${
                space.includes('냉장') ? 'text-yellow-300' : 'text-teal-300'
              } text-base pl-2`}
            >
              {space.slice(0, 3)}
            </Text>
            <Text styletw='text-lime-300 text-base'>{space.slice(3, 6)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RNModal>
  );
}
