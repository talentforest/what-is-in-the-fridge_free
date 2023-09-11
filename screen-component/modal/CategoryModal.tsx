import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
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
    ],
  });

  if (!isLoaded) return null;

  return (
    <Modal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      style={tw`justify-center mx-4`}
      animationIn='fadeIn'
      animationOut='fadeOut'
      hasBackdrop
    >
      <View style={tw`mx-5 my-6 gap-4`}>
        <Text style={tw.style('', FontGmarketSansBold)}>카테고리 선택</Text>

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
