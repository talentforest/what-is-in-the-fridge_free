import { useState } from 'react';
import { TouchableOpacity } from '../common/native-component';
import { FoodLocation } from '../../constant/fridgeInfo';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { formTwoSteps } from '../../constant/formInfo';
import { useSelector } from '../../redux/hook';
import { Alert } from 'react-native';
import { alertPhrase } from '../../constant/alertPhrase';

import AddFoodModal from '../../screen-component/modal/AddFoodModal';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodLocation?: FoodLocation;
  foodLengthBySpace: number;
}

export const MAX_LIST_LENGTH = 15;

export default function AddFoodBtn({ foodLocation, foodLengthBySpace }: Props) {
  const { dragMode } = useSelector((state) => state.dragMode);
  const [modal, setModal] = useState(false);

  const {
    excess: { title, msg },
  } = alertPhrase;

  const onPress = () => {
    if (foodLengthBySpace === MAX_LIST_LENGTH) {
      return Alert.alert(title, msg);
    } else {
      setModal(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
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
