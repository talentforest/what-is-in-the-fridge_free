import { ScrollView } from 'react-native';
import { useRef, useState } from 'react';
import { FoodLocation } from '../../constant/fridgeInfo';
import { useGetFoodList } from '../../hooks';
import { formFourSteps, formThreeSteps } from '../../constant/formInfo';
import { scrollToEnd } from '../../util';

import FoodDetailModal from '../modal/FoodDetailModal';
import ExpandedCompartmentModal from '../modal/ExpandedCompartmentModal';
import CompartmentBox from '../../components/compartment/CompartmentBox';
import AddFoodModal from '../modal/AddFoodModal';

interface Props {
  foodLocation: FoodLocation;
}

export default function Compartment({ foodLocation }: Props) {
  const { space, compartmentNum } = foodLocation;

  const [expandCompartment, setExpandCompartment] = useState(false);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { getFoodList } = useGetFoodList();
  const foodListByCompartment = getFoodList(
    'fridgeFoods',
    space,
    compartmentNum
  );

  return (
    <>
      <CompartmentBox
        scrollViewRef={scrollViewRef}
        title={`${compartmentNum}칸`}
        foodList={foodListByCompartment}
        setOpenFoodDetailModal={setOpenFoodDetailModal}
        setExpandCompartment={setExpandCompartment}
        setOpenAddFoodModal={setOpenAddFoodModal}
      />

      <ExpandedCompartmentModal
        compartmentNum={compartmentNum}
        foodList={foodListByCompartment}
        expandCompartment={expandCompartment}
        setExpandCompartment={setExpandCompartment}
      />

      <FoodDetailModal
        modalVisible={openFoodDetailModal}
        openAddFoodModal={openAddFoodModal}
        setModalVisible={setOpenFoodDetailModal}
        formSteps={formFourSteps}
      />

      <AddFoodModal
        scrollEnd={() => scrollToEnd(scrollViewRef)}
        modalVisible={openAddFoodModal}
        setModalVisible={setOpenAddFoodModal}
        formSteps={formThreeSteps}
        foodLocation={foodLocation}
      />
    </>
  );
}
