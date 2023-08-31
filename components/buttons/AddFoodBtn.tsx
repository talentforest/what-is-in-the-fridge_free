import { useState } from 'react';
import { TouchableOpacity } from '../common/native-component';
import { FoodLocation } from '../../constant/fridgeInfo';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';

import AddFoodModal from '../../screen-component/modal/AddFoodModal';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodLocation?: FoodLocation;
  onPress?: () => void;
  moveMode: boolean;
}

export default function AddFoodBtn({ foodLocation, onPress, moveMode }: Props) {
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
        disabled={moveMode}
      >
        <Icon
          type='MaterialCommunityIcons'
          name='plus'
          size={25}
          color={moveMode ? LIGHT_GRAY : BLUE}
        />
      </TouchableOpacity>
      {modal && foodLocation && (
        <AddFoodModal
          foodLocation={foodLocation}
          modalVisible={modal}
          setModalVisible={setModal}
          formSteps={[
            { id: 1, name: '식품 정보' },
            { id: 2, name: '식품 날짜' },
          ]}
        />
      )}
    </>
  );
}
