import { View } from 'react-native';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { useFindFood } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { showCategoryModal } from '../../redux/slice/modalVisibleSlice';
import { closeKeyboard } from '../../util';

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

  const { isFavoriteItem } = useFindFood();
  const isFavoriteItemCategory = isFavoriteItem(name);

  // 새로 추가하는데 자주 먹는 식료품인 경우 비활성화
  const disabled = isFavoriteItemCategory && isAddNewOne;

  const category = disabled ? isFavoriteItemCategory.category : fixedCategory;

  const dispatch = useDispatch();

  const onModalOpenPress = () => {
    closeKeyboard();
    dispatch(showCategoryModal(true));
  };

  return (
    <View>
      <FormLabel label='카테고리' />

      <TouchableOpacity
        onPress={onModalOpenPress}
        disabled={disabled}
        style={tw.style(`${InputStyle}`, shadowStyle(3))}
      >
        <View style={tw`flex-row items-center h-full`}>
          <CategoryIcon category={category} size={16} inActive={disabled} />

          <TextInput
            editable={false}
            value={category}
            style={tw`border-0 flex-1 pl-2 h-full bg-transparent ${
              disabled ? 'text-slate-400' : 'text-slate-800'
            }`}
          />
        </View>
      </TouchableOpacity>

      <CategoryModal />
    </View>
  );
}
