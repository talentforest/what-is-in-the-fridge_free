import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { Category, foodCategories } from '../../constant/foodCategories';
import { useImageLoad } from '../../hooks/';

import Modal from '../../components/modal/Modal';
import CategoryBox from '../../components/modal/CategoryBox';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  title: '카테고리 선택' | '자주 먹는 식료품에서 선택';
  currentChecked?: string;
  onCheckBoxPress?: (category: Category) => void;
}

export default function FormItemDetailModal({
  modalVisible,
  setModalVisible,
  title,
  currentChecked,
  onCheckBoxPress,
}: Props) {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/category-fresh.png'),
      require('../../assets/category-meat-fish.png'),
      require('../../assets/category-instant.png'),
      require('../../assets/category-dessert.png'),
      require('../../assets/category-sidedish.png'),
      require('../../assets/category-egg-dairy.png'),
      require('../../assets/category-sauce.png'),
      require('../../assets/category-drink.png'),
      require('../../assets/category-bakery.png'),
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
      <View style={tw`m-6 gap-3`}>
        <Text style={tw.style('text-blue-600', FontGmarketSansBold)}>
          {title}
        </Text>

        {onCheckBoxPress && (
          <View style={tw`flex-row flex-wrap gap-1.5 justify-between`}>
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
