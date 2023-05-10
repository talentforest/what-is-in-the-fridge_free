import { CompartmentNum, Space } from '../../constant/fridgeInfo';
import RNModal from './component/Modal';
import FormImageItem from '../form/FormImageItem';
import FoodForm from '../form/FoodForm';
import SubmitBtn from '../form/SubmitBtn';
import useAddFood from '../../hooks/useAddFood';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  space: Space;
  compartmentNum: CompartmentNum;
}

export type FormLabel =
  | '식료품 카테고리'
  | '식료품 이름'
  | '식료품 구매날짜'
  | '식료품 유통기한'
  | '자주 먹는 식료품';

export default function AddFoodModal({
  space,
  compartmentNum,
  modalVisible,
  setModalVisible,
}: Props) {
  const { newFood, changeFoodInfo, onSubmitFromForm } = useAddFood({
    space,
    compartmentNum,
  });

  return (
    <RNModal
      title='식료품 정보 입력'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <FormImageItem value={newFood.image} changeFoodInfo={changeFoodInfo} />
      <FoodForm food={newFood} changeFoodInfo={changeFoodInfo} />
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onSubmitFromForm();
          setModalVisible(false);
        }}
      />
    </RNModal>
  );
}
