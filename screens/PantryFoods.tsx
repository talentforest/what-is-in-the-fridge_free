import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { useGetFoodList } from '../hooks';
import { entireFilterObj, expiredFilters } from '../util';
import { formThreeSteps } from '../constant/formInfo';
import { useFocusEffect } from '@react-navigation/native';
import { changePantryFilter } from '../redux/slice/filterSlice';
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
  const { pantryFilter } = useSelector((state) => state.filter);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const { getFilteredFoodList } = useGetFoodList();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (pantryFilter !== '전체') {
          dispatch(changePantryFilter('전체'));
        }
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, ...expiredFilters]}
          getTableList={getFilteredFoodList}
          foodList={pantryFoods}
        />

        <CompartmentContainer>
          <CompartmentBox
            title='팬트리'
            foodList={pantryFoods}
            spaceTotalLength={pantryFoods.length}
            scrollEnabled
            setOpenAddFoodModal={setOpenAddFoodModal}
          >
            {pantryFoods.map((food) => (
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
