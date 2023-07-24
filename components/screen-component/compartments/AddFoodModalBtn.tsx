import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { INDIGO } from '../../../constant/colors';
import AddFoodModal from '../../modal/AddFoodModal';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import { FormSteps } from '../../../constant/formInfo';

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
      <TouchableOpacity onPress={onPressFc} style={tw`p-1.5 pb-1`}>
        <Icon
          type='MaterialCommunityIcons'
          name='plus'
          size={26}
          color={INDIGO}
        />
      </TouchableOpacity>
      {modal && foodLocation && (
        <AddFoodModal
          foodLocation={foodLocation}
          modalVisible={modal}
          setModalVisible={setModal}
          formSteps={
            [
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 날짜' },
            ] as FormSteps
          }
        />
      )}
    </>
  );
}
