import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { formFourSteps } from '../../constant/formInfo';
import { useState } from 'react';

import EmptySign from '../../components/common/EmptySign';
import FoodBox from '../../components/common/FoodBox';
import FoodDetailModal from './FoodDetailModal';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
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

  const closeModal = () => setExpandCompartment(false);

  const { height } = useWindowDimensions();

  return (
    <FadeInMiddleModal
      title={`${compartmentNum}칸 크게 보기`}
      isVisible={expandCompartment}
      closeModal={closeModal}
    >
      {!!foodList.length ? (
        <ScrollView
          style={tw`h-[${height * 0.45}px] bg-sky-100 rounded-xl`}
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
          style={tw`h-[${height * 0.3}px]
            flex-row items-center justify-center`}
        >
          <EmptySign
            message='식료품이 아직 없어요.'
            assetSize={60}
            compartmentNum={compartmentNum}
          />
        </View>
      )}

      <FoodDetailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formSteps={formFourSteps}
      />
    </FadeInMiddleModal>
  );
}
