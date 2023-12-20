import { View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { useEditFood, useDeleteFood, useFindFood } from '../../hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from '../../redux/hook';
import { showOpenFoodDetailModal } from '../../redux/slice/modalVisibleSlice';

import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import AlertModal from './AlertModal';
import FoodDetail from '../../components/food-detail/FoodDetail';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
}

export default function FoodDetailModal({ formSteps }: Props) {
  const { openFoodDetailModal } = useSelector((state) => state.modalVisible);

  const { formFood, originName, editing, setEditing, onEditSumbit } =
    useEditFood();

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const closeModal = () => {
    if (editing) {
      setEditing(false);
    }
    dispatch(showOpenFoodDetailModal(false));
  };

  const { space, id, name } = formFood;

  const { deleteFood } = useDeleteFood(space);

  const onDeletePress = () => deleteFood(id);

  const toggleEditing = () => setEditing(true);

  const { findFood } = useFindFood();

  const hasFood = findFood(name);

  const editedName = name !== originName;

  return (
    <>
      <Modal
        title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
        closeModal={closeModal}
        isVisible={openFoodDetailModal}
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
                onPress={onEditSumbit}
                disabled={!!hasFood && editedName}
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
                    space === '실온보관' ? '실온보관에서' : '냉장고에서'
                  } 식료품 삭제`}
                  onPress={onDeletePress}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>

      <AlertModal />
    </>
  );
}
