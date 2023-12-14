import { TouchableOpacity } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useDispatch, useSelector } from '../../redux/hook';
import { useFindFood, useHandleAlert } from '../../hooks';
import { MAX_LIMIT, initialFridgeFood } from '../../constant/foodInfo';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showOpenAddFoodModal } from '../../redux/slice/modalVisibleSlice';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function AddCircleBtn() {
  const { purchased } = useSelector((state) => state.purchaseState);

  const { allFoods } = useFindFood();

  const { alertReachedLimit, setAlert } = useHandleAlert();

  const dispatch = useDispatch();

  const onPress = () => {
    if (!purchased && allFoods.length >= MAX_LIMIT) {
      return setAlert(alertReachedLimit);
    }
    dispatch(setFormFood(initialFridgeFood));
    dispatch(
      showOpenAddFoodModal({ modalVisible: true, compartmentNum: '1번' })
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `absolute bottom-3 right-3 border border-indigo-200 bg-indigo-300 w-18 aspect-square items-center justify-center self-end rounded-full`,
        shadowStyle(6)
      )}
    >
      <Icon name='plus' type='Octicons' size={35} color={'#fff'} />
    </TouchableOpacity>
  );
}
