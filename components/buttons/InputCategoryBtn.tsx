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
      style={tw`h-full -mr-2 border-r border-slate-100 flex-row items-center justify-center`}
    >
      <View style={tw`pl-3.5 pr-2.5`}>
        <CategoryIcon category={category} size={20} />
      </View>
    </TouchableOpacity>
  );
}
