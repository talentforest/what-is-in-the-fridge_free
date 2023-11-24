import { View } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import { useImageLoad } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { showCategoryModal } from '../../redux/slice/modalVisibleSlice';

import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import CategoryBox from '../../components/modal/CategoryBox';
import tw from 'twrnc';

export default function CategoryModal() {
  const { category: currCategory } = useSelector((state) => state.category);
  const { categoryModalVisible } = useSelector((state) => state.modalVisible);

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/category/category-fresh.png'),
      require('../../assets/category/category-meat-fish.png'),
      require('../../assets/category/category-instant.png'),
      require('../../assets/category/category-dessert.png'),
      require('../../assets/category/category-sidedish.png'),
      require('../../assets/category/category-dairy-egg.png'),
      require('../../assets/category/category-sauce.png'),
      require('../../assets/category/category-drink.png'),
      require('../../assets/category/category-bakery-jam.png'),
      require('../../assets/category/category-can.png'),
      require('../../assets/category/category-powder.png'),
      require('../../assets/category/category-noodle.png'),
    ],
  });

  const getMatchURI = (category: Category) => {
    const matchItem = foodCategories.find((i) => i.category === category);
    const asset = assets?.find(
      ({ name }) => `${name}.png` === matchItem?.image
    );
    return asset?.localUri;
  };

  const dispatch = useDispatch();

  const closeModal = () => dispatch(showCategoryModal(false));

  if (!isLoaded) return null;

  return (
    <FadeInMiddleModal
      title='카테고리 선택'
      isVisible={categoryModalVisible}
      closeModal={closeModal}
    >
      {assets && (
        <View style={tw`flex-row flex-wrap gap-1.5 gap-y-2.5 justify-between`}>
          {foodCategories.map(({ category }) => (
            <CategoryBox
              key={category}
              category={category}
              checked={category === currCategory}
              localUri={getMatchURI(category) || assets[0].uri}
            />
          ))}
        </View>
      )}
    </FadeInMiddleModal>
  );
}
