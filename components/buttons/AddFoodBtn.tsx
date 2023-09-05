import { useState } from 'react';
import { TouchableOpacity } from '../common/native-component';
import { FoodLocation } from '../../constant/fridgeInfo';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { formTwoSteps } from '../../constant/formInfo';
import { useSelector } from '../../redux/hook';

import AddFoodModal from '../../screen-component/modal/AddFoodModal';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodLocation?: FoodLocation;
  onPress?: () => void;
}

export default function AddFoodBtn({ foodLocation, onPress }: Props) {
  const { dragMode } = useSelector((state) => state.dragMode);
  const [modal, setModal] = useState(false);

  const onPressFc = () => {
    if (onPress) {
      onPress();
    }
    setModal(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPressFc}
        style={tw`px-2 h-full items-center justify-center`}
        disabled={dragMode}
      >
        <Icon
          type='MaterialCommunityIcons'
          name='plus'
          size={25}
          color={dragMode ? LIGHT_GRAY : BLUE}
        />
      </TouchableOpacity>
      {modal && foodLocation && (
        <AddFoodModal
          foodLocation={foodLocation}
          modalVisible={modal}
          setModalVisible={setModal}
          formSteps={formTwoSteps}
        />
      )}
    </>
  );
}
