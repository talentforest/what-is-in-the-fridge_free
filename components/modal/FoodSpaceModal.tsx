import { Food } from '../../constant/foods';
import { Dimensions, View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { SpaceName } from '../../constant/fridge';
import RNModal from './component/Modal';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAddFood from '../../hooks/useAddFood';

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
  const { onSubmitFromSpaceModal } = useAddFood({});

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
            onPress={() => {
              onSubmitFromSpaceModal(space, food);
              setModalVisible(false);
            }}
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
