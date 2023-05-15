import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { CompartmentType } from '../../../constant/fridgeInfo';
import { Food } from '../../../constant/foods';
import { DEEP_INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFoodModal from '../../modal/AddFoodModal';

interface Props {
  selectedFood?: Food;
  compartment?: CompartmentType;
  onPress?: () => void;
}

export default function AddFoodModalBtn({
  selectedFood,
  compartment,
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
      {modal && (
        <AddFoodModal
          selectedFood={selectedFood}
          compartment={compartment}
          modalVisible={modal}
          setModalVisible={setModal}
        />
      )}
    </>
  );
}
