import { ScrollView } from 'react-native';
import { useRef, useState } from 'react';
import { FoodPosition } from '../../constant/fridgeInfo';
import { useGetFoodList } from '../../hooks';
import { formFourSteps } from '../../constant/formInfo';
import { scrollToEnd } from '../../util';

import FoodDetailModal from '../../screen-component/modal/FoodDetailModal';
import ExpandedCompartmentModal from '../../screen-component/modal/ExpandedCompartmentModal';
import CompartmentBox from './CompartmentBox';
import AddFoodModal from '../../screen-component/modal/AddFoodModal';

interface Props {
  currPosition: FoodPosition;
}

export default function Compartment({ currPosition }: Props) {
  const { space, compartmentNum } = currPosition;

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
        modalVisible={openAddFoodModal}
        setModalVisible={setOpenAddFoodModal}
        currPosition={currPosition}
        scrollEnd={() => scrollToEnd(scrollViewRef)}
      />
    </>
  );
}
