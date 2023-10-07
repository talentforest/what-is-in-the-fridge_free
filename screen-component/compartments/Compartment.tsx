import { Animated, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Food } from '../../constant/foodInfo';
import { FoodLocation } from '../../constant/fridgeInfo';
import { useGetFoodList } from '../../hooks';
import { formThreeSteps } from '../../constant/formInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';

import FoodDetailModal from '../modal/FoodDetailModal';
import ExpandedCompartmentModal from '../modal/ExpandedCompartmentModal';
import DraggableFoodBox from './DraggableFoodBox';
import DragGeneratedFoodBox from './DragGeneratedFoodBox';
import CompartmentBox from '../../components/compartment/CompartmentBox';
import AddFoodModal from '../modal/AddFoodModal';

interface Props {
  foodLocation: FoodLocation;
  foodLengthBySpace: number;
}

export default function Compartment({
  foodLocation,
  foodLengthBySpace,
}: Props) {
  const { space, compartmentNum } = foodLocation;

  const { dragMode } = useSelector((state) => state.dragMode);
  const { compartmentNumToDrop } = useSelector(
    (state) => state.compartmentNumToDrop
  );

  const [isDragging, setIsDragging] = useState(false);
  const [expandCompartment, setExpandCompartment] = useState(false);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const { getFoodList } = useGetFoodList();

  const compartmentFoodList = getFoodList('fridgeFoods', space, compartmentNum);

  const dragPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const dispatch = useDispatch();

  useEffect(() => {
    if (dragMode) {
      dispatch(toggleDragMode(false));
    }
  }, []);

  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollEnd = () => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  };

  return (
    <>
      <CompartmentBox
        title={`${compartmentNum}칸`}
        foodList={getFoodList('fridgeFoods', space, compartmentNum)}
        spaceTotalLength={foodLengthBySpace}
        scrollEnabled={!dragMode && !isDragging}
        bgToDrop={compartmentNumToDrop === compartmentNum && dragMode}
        compartmentNumToDrop={compartmentNumToDrop}
        setExpandCompartment={setExpandCompartment}
        setOpenAddFoodModal={setOpenAddFoodModal}
        scrollViewRef={scrollViewRef}
      >
        {compartmentFoodList.map((food: Food) => (
          <DraggableFoodBox
            key={food.id}
            food={food}
            setIsDragging={setIsDragging}
            setModalVisible={setOpenFoodDetailModal}
            dragPosition={dragPosition}
          />
        ))}
      </CompartmentBox>

      {/* 드래깅 시 생성되는 음식박스 */}
      {isDragging && dragMode && (
        <DragGeneratedFoodBox dragPosition={dragPosition} />
      )}

      <ExpandedCompartmentModal
        compartmentNum={compartmentNum}
        foodList={compartmentFoodList}
        expandCompartment={expandCompartment}
        setExpandCompartment={setExpandCompartment}
      />

      <FoodDetailModal
        modalVisible={openFoodDetailModal}
        setModalVisible={setOpenFoodDetailModal}
        formSteps={formThreeSteps}
      />

      <AddFoodModal
        scrollEnd={scrollEnd}
        modalVisible={openAddFoodModal}
        setModalVisible={setOpenAddFoodModal}
        formSteps={formThreeSteps}
        foodLocation={foodLocation}
      />
    </>
  );
}
