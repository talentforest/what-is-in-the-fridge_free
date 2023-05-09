import { Food } from '../../constant/foods';
import { getISODate } from '../../util';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Space, SpaceName } from '../../constant/fridge';
import { useDispatch } from '../../redux/hook';
import { addFood } from '../../redux/slice/allFoodsSlice';
import RNModal from './component/Modal';
import tw from 'twrnc';

interface Props {
  food: Food;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}
export default function AddFavoriteFoodModal({
  food,
  modalVisible,
  setModalVisible,
}: Props) {
  const dispatch = useDispatch();

  const onSubmit = (space: Space) => {
    const favoriteFoodInfo: Food = {
      ...food,
      expirationDate: getISODate(new Date()),
      purchaseDate: getISODate(new Date()),
      space,
      compartmentNum: '1번',
    };
    dispatch(addFood(favoriteFoodInfo));
    setModalVisible(false);
  };

  return (
    <RNModal
      title='냉장고에 자주 먹는 식료품 추가하기'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <View style={tw`mt-4 flex-row w-full justify-between gap-1`}>
        {SpaceName.slice(0, 2).map((space) => (
          <TouchableOpacity
            key={space}
            onPress={() => {
              onSubmit(space);
            }}
            style={tw`p-4 flex-1 rounded-md items-center bg-indigo-600`}
          >
            <Text styletw='text-white'>{space}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`mt-1 mb-6 flex-row w-full justify-between gap-1`}>
        {SpaceName.slice(2, 4).map((space) => (
          <TouchableOpacity
            key={space}
            onPress={() => {
              onSubmit(space);
            }}
            style={tw`p-4 flex-1 rounded-md items-center bg-indigo-600`}
          >
            <Text styletw='text-white'>{space}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RNModal>
  );
}
