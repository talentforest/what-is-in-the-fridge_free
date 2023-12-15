import { ScrollView } from 'react-native';
import { useRef } from 'react';
import { FoodPosition } from '../../constant/fridgeInfo';
import { useGetFoodList } from '../../hooks';
import { scrollToEnd } from '../../util';
import { useSelector } from '../../redux/hook';

import ExpandedCompartmentModal from '../../screen-component/modal/ExpandedCompartmentModal';
import CompartmentBox from './CompartmentBox';
import AddFoodModal from '../../screen-component/modal/AddFoodModal';

interface Props {
  currPosition: FoodPosition;
}

export default function Compartment({ currPosition }: Props) {
  const { space, compartmentNum } = currPosition;

  const { expandCompartmentModal, openAddFoodModal } = useSelector(
    (state) => state.modalVisible
  );

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { getMatchedPositionFoods } = useGetFoodList();

  const foodListByCompartment = getMatchedPositionFoods(
    'allFoods',
    space,
    compartmentNum
  );

  const scrollEnd = () => scrollToEnd(scrollViewRef);

  return (
    <>
      <CompartmentBox
        compartmentNum={compartmentNum}
        foodList={foodListByCompartment}
        scrollViewRef={scrollViewRef}
      />

      {compartmentNum === expandCompartmentModal?.compartmentNum && (
        <ExpandedCompartmentModal
          compartmentNum={compartmentNum}
          foodList={foodListByCompartment}
        />
      )}

      {compartmentNum === openAddFoodModal?.compartmentNum && (
        <AddFoodModal currPosition={currPosition} scrollEnd={scrollEnd} />
      )}
    </>
  );
}
