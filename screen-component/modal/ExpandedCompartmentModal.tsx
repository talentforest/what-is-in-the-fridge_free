import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../../components/common/native-component';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { formThreeSteps } from '../../constant/formInfo';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch } from '../../redux/hook';
import { DEVICE_HEIGHT } from '../../util';

import EmptySign from '../../components/common/EmptySign';
import Modal from '../../components/modal/Modal';
import FoodBox from '../../components/common/FoodBox';
import FoodDetailModal from './FoodDetailModal';
import tw from 'twrnc';

interface Props {
  compartmentNum: CompartmentNum;
  foodList: Food[];
  expandCompartment: boolean;
  setExpandCompartment: (visible: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function ExpandedCompartmentModal({
  compartmentNum,
  foodList,
  expandCompartment,
  setExpandCompartment,
  modalVisible,
  setModalVisible,
}: Props) {
  const dispatch = useDispatch();

  return (
    <Modal
      title={`${compartmentNum}칸`}
      isVisible={expandCompartment}
      closeModal={() => setExpandCompartment(false)}
      animationIn='fadeIn'
    >
      <View style={tw`rounded-b-2xl bg-stone-200 px-2`}>
        {!!foodList.length ? (
          <ScrollView
            style={tw`h-[${DEVICE_HEIGHT * 0.5}px]`}
            contentContainerStyle={tw`flex-row p-2 flex-1 flex-wrap gap-1 items-center`}
            showsVerticalScrollIndicator={false}
          >
            {foodList.map((food: Food) => (
              <TouchableOpacity
                key={food.id}
                onPress={() => {
                  dispatch(select(food));
                  setModalVisible(true);
                }}
                style={tw`bg-white rounded-lg`}
              >
                <FoodBox food={food} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={tw`h-50 flex-row items-center pb-10 justify-center`}>
            <EmptySign message='식료품이 아직 없어요.' />
          </View>
        )}
      </View>

      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={formThreeSteps}
        />
      )}
    </Modal>
  );
}
