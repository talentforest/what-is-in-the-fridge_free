import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  InputStyle,
  Text,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
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
}

export default function CategoryItem({
  name,
  fixedCategory,
  changeInfo,
  title,
}: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { isFavoriteItem } = useFindFood();
  const favoriteFoodItemCategory = isFavoriteItem(name)?.category;
  const disabled = favoriteFoodItemCategory && !title.includes('수정');

  const category = disabled ? favoriteFoodItemCategory : fixedCategory;

  const dispatch = useDispatch();

  const onCheckBoxPress = (category: Category) => {
    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품 목록에 포함되어 있을 경우 해당 아이템의 카테고리 정보도 변경
      dispatch(editFavorite({ ...isFavoriteItem(name), category }));
    }
    changeInfo({ category });
    setCategoryOpen(false);
  };

  const onPress = () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setCategoryOpen((prev) => !prev);
  };

  return (
    <View>
      <FormLabel label='카테고리' />

      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={tw.style(`${InputStyle}`, shadowStyle(3))}
      >
        <View style={tw`flex-row items-center h-full`}>
          <CategoryIcon category={category} size={16} inActive={disabled} />

          <TextInput
            editable={false}
            value={category}
            style={tw`border-0 flex-1 pl-2 h-full`}
          />
        </View>
      </TouchableOpacity>

      <CategoryModal
        modalVisible={categoryOpen}
        setModalVisible={setCategoryOpen}
        currentChecked={fixedCategory}
        onCheckBoxPress={onCheckBoxPress}
      />
    </View>
  );
}
