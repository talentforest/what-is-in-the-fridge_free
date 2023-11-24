import { useDispatch, useSelector } from '../../redux/hook';
import { View } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { showCategoryModal } from '../../redux/slice/modalVisibleSlice';

import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

export default function InputCategoryBtn() {
  const { category } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const onOpenModalPress = () => dispatch(showCategoryModal(true));

  return (
    <TouchableOpacity
      onPress={onOpenModalPress}
      style={tw`h-full border-r border-slate-200 flex-row items-center justify-center`}
    >
      <View style={tw`pl-3.5 pr-2.5 pb-0.5`}>
        <CategoryIcon category={category} size={18} />
      </View>
    </TouchableOpacity>
  );
}
