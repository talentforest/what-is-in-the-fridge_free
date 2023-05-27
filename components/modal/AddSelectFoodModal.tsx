import { Text } from '../native-component';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import RNModal from './common/Modal';
import Form from './form/Form';
import useAddSelectFood from '../../hooks/useAddSelectFood';
import SubmitBtn from './form/SubmitBtn';
import useRouteName from '../../hooks/useRouteName';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function AddSelectFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const { selectedFood, onChange, onSubmit } = useAddSelectFood();
  const { currRoute } = useRouteName();

  return (
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Text styletw='text-slate-500 my-2'>
        * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
      </Text>
      <View
        style={tw`mt-4 w-full items-center gap-4 h-[${
          Dimensions.get('window').height / 6
        }]px`}
      >
        {currRoute === 'FavoriteFoods' && (
          <View style={tw`items-center gap-2`}>
            {selectedFood.image.includes('http') ? (
              <Image
                style={tw`h-20 w-20 rounded-md`}
                source={{ uri: selectedFood.image }}
              />
            ) : (
              <Text styletw='text-5xl pt-4'>{selectedFood.image}</Text>
            )}
            <Text>{selectedFood.name}</Text>
          </View>
        )}
        <ScrollView style={tw`w-full`}>
          <View style={tw`gap-5 mb-8`}>
            <Form
              items={[
                currRoute !== 'FavoriteFoods' && '아이콘과 이름',
                '위치 선택',
                '카테고리',
                '구매날짜',
                '유통기한',
                currRoute !== 'FavoriteFoods' && '즐겨찾는 식품인가요?',
              ]}
              food={selectedFood}
              changeInfo={onChange}
            />
          </View>
        </ScrollView>
        <SubmitBtn
          btnName='식료품 정보 추가하기'
          onPress={() => {
            onSubmit();
            setModalVisible(false);
          }}
        />
      </View>
    </RNModal>
  );
}
