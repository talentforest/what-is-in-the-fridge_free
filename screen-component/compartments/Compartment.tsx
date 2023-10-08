import { ScrollView } from 'react-native';
import { useRef, useState } from 'react';
import { Food } from '../../constant/foodInfo';
import { FoodLocation } from '../../constant/fridgeInfo';
import { useGetFoodList } from '../../hooks';
import { formFourSteps, formThreeSteps } from '../../constant/formInfo';
import { useDispatch } from '../../redux/hook';
import { TouchableOpacity } from '../../components/common/native-component';
import { select } from '../../redux/slice/selectedFoodSlice';

import FoodDetailModal from '../modal/FoodDetailModal';
import ExpandedCompartmentModal from '../modal/ExpandedCompartmentModal';
import CompartmentBox from '../../components/compartment/CompartmentBox';
import AddFoodModal from '../modal/AddFoodModal';
import FoodBox from '../../components/common/FoodBox';

interface Props {
  foodLocation: FoodLocation;
  foodLengthBySpace: number;
}

export default function Compartment({
  foodLocation,
  foodLengthBySpace,
}: Props) {
  const { space, compartmentNum } = foodLocation;

  const [expandCompartment, setExpandCompartment] = useState(false);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const { getFoodList } = useGetFoodList();

  const compartmentFoodList = getFoodList('fridgeFoods', space, compartmentNum);

  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollEnd = () => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  };

  const dispatch = useDispatch();

  return (
    <>
      <CompartmentBox
        title={`${compartmentNum}칸`}
        foodList={getFoodList('fridgeFoods', space, compartmentNum)}
        spaceTotalLength={foodLengthBySpace}
        setExpandCompartment={setExpandCompartment}
        setOpenAddFoodModal={setOpenAddFoodModal}
        scrollViewRef={scrollViewRef}
      >
        {compartmentFoodList.map((food: Food) => (
          <TouchableOpacity
            key={food.id}
            onPress={() => {
              dispatch(select(food));
              setOpenFoodDetailModal(true);
            }}
          >
            <FoodBox food={food} />
          </TouchableOpacity>
        ))}
      </CompartmentBox>

      <ExpandedCompartmentModal
        compartmentNum={compartmentNum}
        foodList={compartmentFoodList}
        expandCompartment={expandCompartment}
        setExpandCompartment={setExpandCompartment}
      />

      <FoodDetailModal
        modalVisible={openFoodDetailModal}
        setModalVisible={setOpenFoodDetailModal}
        formSteps={formFourSteps}
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
