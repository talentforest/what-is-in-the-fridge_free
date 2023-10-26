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
  noneBackdrop?: boolean;
}

export default function CategoryModal({
  modalVisible,
  setModalVisible,
  currentChecked,
  onCheckBoxPress,
  noneBackdrop,
}: Props) {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/category/category-fresh.png'),
      require('../../assets/category/category-meat-fish-egg.png'),
      require('../../assets/category/category-instant.png'),
      require('../../assets/category/category-dessert.png'),
      require('../../assets/category/category-sidedish.png'),
      require('../../assets/category/category-dairy.png'),
      require('../../assets/category/category-sauce.png'),
      require('../../assets/category/category-drink.png'),
      require('../../assets/category/category-bakery.png'),
      require('../../assets/category/category-can.png'),
      require('../../assets/category/category-powder.png'),
      require('../../assets/category/category-noodle.png'),
    ],
  });

  if (!isLoaded) return null;

  const getMatchURI = (category: Category) => {
    const matchItem = foodCategories.find((i) => i.category === category);
    const asset = assets?.find(
      ({ name }) => `${name}.png` === matchItem?.image
    );
    return asset?.localUri;
  };

  return (
    <Modal
      title='카테고리 선택'
      isVisible={modalVisible}
      closeModal={() => setModalVisible(false)}
      animationIn='fadeIn'
      hasBackdrop={!noneBackdrop}
    >
      <View style={tw`p-3 rounded-b-2xl bg-white`}>
        {onCheckBoxPress && assets && (
          <View
            style={tw`flex-row flex-wrap gap-1.5 gap-y-2.5 justify-between`}
          >
            {foodCategories.map(({ category }) => (
              <CategoryBox
                key={category}
                checked={category === currentChecked}
                category={category}
                onCheckBoxPress={onCheckBoxPress}
                localUri={getMatchURI(category) || assets[0].uri}
              />
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
}
