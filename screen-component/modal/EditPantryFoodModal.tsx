import Modal from '../../components/modal/Modal';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function EditPantryFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  return (
    <Modal
      title='팬트리 식료품 추가'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackdrop
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <></>
    </Modal>
  );
}
