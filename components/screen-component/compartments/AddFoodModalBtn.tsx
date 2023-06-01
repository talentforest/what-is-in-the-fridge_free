import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { Food } from '../../../constant/foods';
import { DEEP_INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFoodModal from '../../modal/AddFoodModal';

interface Props {
  selectedFood?: Food;
  foodLocation?: FoodLocation;
  onPress?: () => void;
}

export default function AddFoodModalBtn({
  selectedFood,
  foodLocation,
  onPress,
}: Props) {
  const [modal, setModal] = useState(false);

  const onPressFc = () => {
    if (onPress) {
      onPress();
    }
    setModal(true);
  };

  return (
    <>
      <TouchableOpacity onPress={onPressFc}>
        <Icon name='basket-plus-outline' size={20} color={DEEP_INDIGO} />
      </TouchableOpacity>
      {modal && foodLocation && (
        <AddFoodModal
          foodLocation={foodLocation}
          modalVisible={modal}
          setModalVisible={setModal}
        />
      )}
    </>
  );
}
