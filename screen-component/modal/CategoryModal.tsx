import { View } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import { useImageLoad } from '../../hooks';

import Modal from '../../components/modal/Modal';
import CategoryBox from '../../components/modal/CategoryBox';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  currentChecked?: string;
  onCheckBoxPress?: (category: Category) => void;
}

export default function CategoryModal({
  modalVisible,
  setModalVisible,
  currentChecked,
  onCheckBoxPress,
}: Props) {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/category/category-fresh.png'),
      require('../../assets/category/category-meat-fish.png'),
      require('../../assets/category/category-instant.png'),
      require('../../assets/category/category-dessert.png'),
      require('../../assets/category/category-sidedish.png'),
      require('../../assets/category/category-egg-dairy.png'),
      require('../../assets/category/category-sauce.png'),
      require('../../assets/category/category-drink.png'),
      require('../../assets/category/category-bakery.png'),
      require('../../assets/category/category-can.png'),
      require('../../assets/category/category-powder.png'),
      require('../../assets/category/category-noodle.png'),
    ],
  });

  if (!isLoaded) return null;

  return (
    <Modal
      title='카테고리 선택'
      isVisible={modalVisible}
      closeModal={() => setModalVisible(false)}
      animationIn='fadeIn'
    >
      <View style={tw`px-5 py-6 gap-4 rounded-b-2xl bg-white`}>
        {onCheckBoxPress && (
          <View style={tw`flex-row flex-wrap gap-2 gap-y-2.5 justify-between`}>
            {foodCategories.map(
              ({ category }) =>
                assets && (
                  <CategoryBox
                    key={category}
                    checked={category === currentChecked}
                    category={category}
                    onCheckBoxPress={onCheckBoxPress}
                    assets={assets}
                  />
                )
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}
