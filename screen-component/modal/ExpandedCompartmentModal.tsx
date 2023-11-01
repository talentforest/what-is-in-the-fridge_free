import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { formThreeSteps } from '../../constant/formInfo';
import { DEVICE_HEIGHT } from '../../util';
import { useState } from 'react';

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
}

export default function ExpandedCompartmentModal({
  compartmentNum,
  foodList,
  expandCompartment,
  setExpandCompartment,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

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
            style={tw`h-[${DEVICE_HEIGHT * 0.4}px]`}
            contentContainerStyle={tw`p-2 flex-row flex-wrap gap-1`}
            showsVerticalScrollIndicator={false}
          >
            {foodList.map((food: Food) => (
              <FoodBox
                key={food.id}
                food={food}
                setOpenFoodDetailModal={setModalVisible}
              />
            ))}
          </ScrollView>
        ) : (
          <View
            style={tw`h-[${DEVICE_HEIGHT * 0.3}px]
            flex-row items-center justify-center`}
          >
            <EmptySign
              message='식료품이 아직 없어요.'
              assetSize={60}
              compartmentNum={compartmentNum}
            />
          </View>
        )}
      </View>

      <FoodDetailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formSteps={formThreeSteps}
      />
    </Modal>
  );
}
