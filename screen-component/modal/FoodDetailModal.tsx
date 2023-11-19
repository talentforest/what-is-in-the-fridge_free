import { View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { useEditFood, useDeleteFood } from '../../hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import AlertModal from './AlertModal';
import FoodDetail from '../../components/food-detail/FoodDetail';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  openAddFoodModal?: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
}

export default function FoodDetailModal({
  modalVisible,
  openAddFoodModal,
  setModalVisible,
  formSteps,
}: Props) {
  const {
    formFood,
    editing,
    setEditing,
    onEditSumbit,
    onAlertComfirmPress, //
  } = useEditFood();

  const insets = useSafeAreaInsets();

  const closeModal = () => {
    if (editing) {
      setEditing(false);
    }
    setModalVisible(false);
  };

  const { space, id } = formFood;

  const { deleteFood } = useDeleteFood({ space, setModalVisible });

  const onDeletePress = () => deleteFood(id);

  const toggleEditing = () => setEditing(true);

  return (
    <>
      <Modal
        title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
        closeModal={closeModal}
        isVisible={modalVisible}
      >
        <View style={{ paddingBottom: insets?.bottom }}>
          {editing ? (
            <>
              <View style={tw`-mx-4`}>
                <Form title='식료품 정보 수정' formSteps={formSteps} />
              </View>

              <SubmitBtn
                color='blue'
                iconName='check'
                btnName='식료품 정보 수정 완료'
                onPress={() => onEditSumbit(setModalVisible)}
              />
            </>
          ) : (
            <View style={tw`pt-4 gap-1`}>
              <FoodDetail />

              <View style={tw`gap-1 mt-1`}>
                <SubmitBtn
                  color='blue'
                  iconName='pencil'
                  btnName='식료품 정보 수정'
                  onPress={toggleEditing}
                />
                <SubmitBtn
                  color='gray'
                  iconName='trash-can-outline'
                  btnName={`${
                    space === '팬트리' ? '팬트리에서' : '냉장고에서'
                  } 식료품 삭제`}
                  onPress={onDeletePress}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>

      <AlertModal onPress={onAlertComfirmPress} />
    </>
  );
}
