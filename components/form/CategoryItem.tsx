import { View } from 'react-native';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { useFindFood, useHandleFoodCategory } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { editFavorite } from '../../redux/slice/favoriteFoodsSlice';
import { editFormFood } from '../../redux/slice/formFoodSlice';

import CategoryModal from '../../screen-component/modal/CategoryModal';
import FormLabel from './FormLabel';
import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

interface Props {
  isAddNewOne?: boolean;
}

export default function CategoryItem({ isAddNewOne }: Props) {
  const {
    formFood: { name, category: fixedCategory },
  } = useSelector((state) => state.formFood);

  const {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    onCategoryModalOpenPress,
  } = useHandleFoodCategory();

  const { isFavoriteItem } = useFindFood();
  const isFavoriteItemCategory = isFavoriteItem(name);

  // 새로 추가하는데 자주 먹는 식료품인 경우 비활성화
  const disabled = isFavoriteItemCategory && isAddNewOne;

  const category = disabled ? isFavoriteItemCategory.category : fixedCategory;

  const dispatch = useDispatch();

  const onCategoryBoxPress = (category: Category) => {
    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품 목록에 포함되어 있을 경우 해당 아이템의 카테고리 정보도 변경
      dispatch(editFavorite({ ...isFavoriteItem(name), category }));
    }
    dispatch(editFormFood({ category }));
    setIsCategoryModalOpen(false);
  };

  return (
    <View>
      <FormLabel label='카테고리' />

      <TouchableOpacity
        onPress={onCategoryModalOpenPress}
        disabled={disabled}
        style={tw.style(`${InputStyle}`, shadowStyle(3))}
      >
        <View style={tw`flex-row items-center h-full`}>
          <CategoryIcon category={category} size={16} inActive={disabled} />

          <TextInput
            editable={false}
            value={category}
            style={tw`border-0 flex-1 pl-2 h-full ${
              disabled ? 'text-slate-400' : 'text-slate-800'
            }`}
          />
        </View>
      </TouchableOpacity>

      <CategoryModal
        modalVisible={isCategoryModalOpen}
        setModalVisible={setIsCategoryModalOpen}
        currentChecked={fixedCategory}
        onCheckBoxPress={onCategoryBoxPress}
      />
    </View>
  );
}
