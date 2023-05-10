import { useState } from 'react';
import { TouchableOpacity } from '../../native-component';
import { CompartmentNum, Space } from '../../../constant/fridgeInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFoodModal from '../../modal/AddFoodModal';

interface Props {
  space: Space;
  index: number;
}

export const AddFoodBtn = ({ space, index }: Props) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModal(true)}>
        <Icon name='basket-plus-outline' size={20} color='#4e45ff' />
      </TouchableOpacity>
      {modal && (
        <AddFoodModal
          space={space}
          compartmentNum={`${index + 1}번` as CompartmentNum}
          modalVisible={modal}
          setModalVisible={setModal}
        />
      )}
    </>
  );
};
