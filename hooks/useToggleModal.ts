import { useState } from 'react';
import { useDispatch } from '../redux/hook';
import { select } from '../redux/slice/selectedFoodSlice';
import { Food } from '../constant/foods';

export default function useToggleModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onModalPress = (food: Food) => {
    dispatch(select(food));
    setModalVisible(true);
  };

  return {
    modalVisible,
    setModalVisible,
    onModalPress,
  };
}
