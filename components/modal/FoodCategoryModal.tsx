import { View } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import RNModal from './common/Modal';
import tw from 'twrnc';
import CheckBoxBtn from './form/CheckBoxBtn';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  categoryItem: Category;
}

export default function FoodCategoryModal({
  modalVisible,
  setModalVisible,
  changeInfo,
  categoryItem,
}: Props) {
  return (
    <RNModal
      title='식료품 카테고리 선택하기'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <View style={tw`my-4 gap-5`}>
        {foodCategories.map(({ id, category }) => (
          <CheckBoxBtn
            key={id}
            onPress={() => {
              changeInfo({ category });
              setModalVisible(false);
            }}
            title={category}
            check={categoryItem === category}
          />
        ))}
      </View>
    </RNModal>
  );
}
