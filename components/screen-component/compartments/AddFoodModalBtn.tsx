import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { DEEP_INDIGO } from '../../../constant/colors';
import AddFoodModal from '../../modal/AddFoodModal';
import Icon from '../../native-component/Icon';

interface Props {
  foodLocation?: FoodLocation;
  onPress?: () => void;
}

export default function AddFoodModalBtn({ foodLocation, onPress }: Props) {
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
        <Icon
          type='MaterialCommunityIcons'
          name='basket-plus-outline'
          size={18}
          color={DEEP_INDIGO}
        />
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
