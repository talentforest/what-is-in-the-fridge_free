import { Image, View, useWindowDimensions } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { useDispatch, useSelector } from '../../redux/hook';
import { changeCategory } from '../../redux/slice/food/categorySlice';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { editFavorite } from '../../redux/slice/food-list/favoriteFoodsSlice';
import { useFindFood } from '../../hooks';
import { showCategoryModal } from '../../redux/slice/modalVisibleSlice';
import tw from 'twrnc';
import { shadowStyle } from '../../constant/shadowStyle';

interface Props {
  checked: boolean;
  category: Category;
  localUri: string;
}

export default function CategoryBox({ checked, category, localUri }: Props) {
  const { categoryModalVisible } = useSelector((state) => state.modalVisible);
  const {
    formFood: { name },
  } = useSelector((state) => state.formFood);

  const checkedColor = checked
    ? 'bg-amber-200 border-amber-200'
    : 'bg-slate-50 border-slate-100';

  const { width, height } = useWindowDimensions();

  const GAP = 20;
  const paddingHorizontal = 32;
  const marginHorizontal = 32;

  const boxWidth =
    height > 900
      ? width * 0.8 - paddingHorizontal
      : width - paddingHorizontal - marginHorizontal;

  const cardWidth = (boxWidth - GAP) / 3;

  const dispatch = useDispatch();

  const { isFavoriteItem } = useFindFood();

  const onCategoryBoxPress = () => {
    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품 목록에 포함되어 있을 경우 해당 아이템의 카테고리 정보도 변경
      dispatch(editFavorite({ ...isFavoriteItem(name), category }));
    }
    dispatch(editFormFood({ category }));
    dispatch(changeCategory(category));
    dispatch(showCategoryModal(false));
  };

  return (
    <TouchableOpacity
      onPress={onCategoryBoxPress}
      style={tw.style(
        `w-[${cardWidth}px] ${checkedColor} flex-row h-22 gap-0.5 items-center justify-center border rounded-xl pt-2 pb-1 px-1.5`,
        shadowStyle(categoryModalVisible ? 3 : 0)
      )}
    >
      <View style={tw`items-center justify-center gap-1`}>
        {localUri && (
          <Image source={{ uri: localUri }} style={{ width: 40, height: 40 }} />
        )}
        <View style={tw`items-center justify-center`}>
          <Text
            fontSize={14}
            style={tw.style(
              `text-center ${checked ? 'text-blue-600' : 'text-slate-600'}`
            )}
          >
            {category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
