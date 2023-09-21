import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { useFocusEffect } from '@react-navigation/native';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { foodCategories } from '../constant/foodCategories';
import { entireFilterObj, favoriteFilterObj } from '../util';
import { formThreeSteps } from '../constant/formInfo';
import { select } from '../redux/slice/selectedFoodSlice';

import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import FoodBox from '../components/common/FoodBox';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import CompartmentBox from '../components/compartment/CompartmentBox';
import AddFoodModal from '../screen-component/modal/AddFoodModal';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const { currentFilter, initializeFilter } = useHandleFilter();
  const { getFilteredFoodList } = useGetFoodList();

  useFocusEffect(
    useCallback(() => {
      initializeFilter();
      return () => {
        initializeFilter();
      };
    }, [])
  );

  const filteredList = getFilteredFoodList(currentFilter, pantryFoods);

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, favoriteFilterObj]}
          categoryFilters={foodCategories}
          getTableList={getFilteredFoodList}
          foodList={filteredList}
        />

        <CompartmentContainer>
          <CompartmentBox
            title='팬트리'
            foodList={filteredList}
            spaceTotalLength={pantryFoods.length}
            scrollEnabled
            setOpenAddFoodModal={setOpenAddFoodModal}
          >
            {filteredList.map((food) => (
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
        </CompartmentContainer>

        {openFoodDetailModal && (
          <FoodDetailModal
            modalVisible={openFoodDetailModal}
            setModalVisible={setOpenFoodDetailModal}
            formSteps={formThreeSteps}
          />
        )}

        <AddFoodModal
          modalVisible={openAddFoodModal}
          setModalVisible={setOpenAddFoodModal}
          formSteps={formThreeSteps}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
