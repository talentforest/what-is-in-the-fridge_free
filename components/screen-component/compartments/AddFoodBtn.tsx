import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { INDIGO } from '../../../constant/colors';
import { FormStep } from '../../../constant/formInfo';
import AddFoodModal from '../modal/AddFoodModal';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodLocation?: FoodLocation;
  onPress?: () => void;
}

export default function AddFoodBtn({ foodLocation, onPress }: Props) {
  const [modal, setModal] = useState(false);

  const onPressFc = () => {
    if (onPress) {
      onPress();
    }
    setModal(true);
  };

  return (
    <>
      <TouchableOpacity onPress={onPressFc} style={tw`px-2 pt-1`}>
        <Icon
          type='MaterialCommunityIcons'
          name='plus'
          size={25}
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
            ] as FormStep[]
          }
        />
      )}
    </>
  );
}
