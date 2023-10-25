import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { useFindFood } from '../../hooks';
import { ModalTitle } from '../modal/Modal';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch } from '../../redux/hook';
import { editFavorite } from '../../redux/slice/favoriteFoodsSlice';

import CategoryModal from '../../screen-component/modal/CategoryModal';
import FormLabel from './FormLabel';
import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

interface Props {
  name: string;
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  title: ModalTitle;
  noneBackdrop?: boolean;
}

export default function CategoryItem({
  name,
  fixedCategory,
  changeInfo,
  title,
  noneBackdrop,
}: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { isFavoriteItem } = useFindFood();
  const favoriteFoodItemCategory = isFavoriteItem(name)?.category;
  const disabledCategory = favoriteFoodItemCategory && !title.includes('수정');

  const category = disabledCategory ? favoriteFoodItemCategory : fixedCategory;

  const dispatch = useDispatch();

  const onCheckBoxPress = (category: Category) => {
    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품 목록에 포함되어 있을 경우 해당 아이템의 카테고리 정보도 변경
      dispatch(editFavorite({ ...isFavoriteItem(name), category }));
    }
    changeInfo({ category });
    setCategoryOpen(false);
  };

  const activeColor = 'border-slate-300 text-slate-900';
  const inActiveColor = 'border-slate-300 text-slate-400';
  const color = disabledCategory ? inActiveColor : activeColor;

  const onPress = () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setCategoryOpen((prev) => !prev);
  };

  return (
    <View>
      <FormLabel label='카테고리' />
      <TouchableOpacity
        onPress={onPress}
        disabled={disabledCategory}
        style={tw.style(
          `h-11 border ${color} px-3 bg-white rounded-lg items-center flex-row gap-2 justify-between`,
          shadowStyle(3)
        )}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <CategoryIcon category={category} size={18} />
          <Text style={tw`${color}`}>{category}</Text>
        </View>
      </TouchableOpacity>

      <CategoryModal
        noneBackdrop={noneBackdrop || false}
        modalVisible={categoryOpen}
        setModalVisible={setCategoryOpen}
        currentChecked={fixedCategory}
        onCheckBoxPress={onCheckBoxPress}
      />
    </View>
  );
}
