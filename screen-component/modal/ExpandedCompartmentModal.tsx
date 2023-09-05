import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import { GRAY } from '../../constant/colors';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { Filter } from '../../util';
import { formTwoSteps } from '../../constant/formInfo';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch, useSelector } from '../../redux/hook';

import EmptySign from '../../components/common/EmptySign';
import Modal from '../../components/modal/Modal';
import Icon from '../../components/common/native-component/Icon';
import FoodBox from '../compartments/FoodBox';
import FoodDetailModal from './FoodDetailModal';
import tw from 'twrnc';

interface Props {
  compartmentNum: CompartmentNum;
  foodList: Food[];
  expandCompartment: boolean;
  setExpandCompartment: (visible: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  filter: Filter;
}

export default function ExpandedCompartmentModal({
  compartmentNum,
  foodList,
  expandCompartment,
  setExpandCompartment,
  modalVisible,
  setModalVisible,
  filter,
}: Props) {
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();

  return (
    <Modal
      title='크게 보기'
      modalVisible={expandCompartment}
      setModalVisible={setExpandCompartment}
      hasBackdrop
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={tw`pt-3 px-5 pb-1.5 flex-row justify-between items-center`}>
        <Text style={tw`text-lg`}>{compartmentNum}칸 크게 보기</Text>
        <TouchableOpacity
          style={tw`-m-3 px-3 py-3`}
          onPress={() => setExpandCompartment(false)}
        >
          <Icon type='Ionicons' name='close' size={24} color={GRAY} />
        </TouchableOpacity>
      </View>
      {!!foodList.length ? (
        <ScrollView
          style={tw`px-3 h-90`}
          contentContainerStyle={tw`flex-row p-2 border border-blue-300 rounded-lg bg-blue-50 flex-1 flex-wrap gap-1 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {foodList.map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                dispatch(select(food));
                setModalVisible(true);
              }}
              style={tw`bg-white rounded-full`}
            >
              <FoodBox food={food} filter={filter} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={tw`h-50 flex-row items-center pb-10 justify-center`}>
          <EmptySign message='식료품이 아직 없어요.' color='slate' />
        </View>
      )}

      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={formTwoSteps}
        />
      )}
    </Modal>
  );
}
