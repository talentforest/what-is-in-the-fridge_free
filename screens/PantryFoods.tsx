import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { entireFilterObj, expiredFilters, scrollToEnd } from '../util';
import { formFourSteps, formThreeSteps } from '../constant/formInfo';

import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import CompartmentBox from '../components/compartment/CompartmentBox';
import AddFoodModal from '../screen-component/modal/AddFoodModal';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { getFilteredFoodList } = useGetFoodList();

  const { initializeFilter } = useHandleFilter();

  useEffect(() => {
    initializeFilter();
  }, []);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView>
        <Container>
          <TableFilters
            filterList={[entireFilterObj, ...expiredFilters]}
            getTableList={getFilteredFoodList}
            foodList={pantryFoods}
          />

          <CompartmentContainer>
            <CompartmentBox
              scrollViewRef={scrollViewRef}
              title='팬트리'
              foodList={pantryFoods}
              setOpenFoodDetailModal={setOpenFoodDetailModal}
              setOpenAddFoodModal={setOpenAddFoodModal}
            />
          </CompartmentContainer>

          <FoodDetailModal
            modalVisible={openFoodDetailModal}
            setModalVisible={setOpenFoodDetailModal}
            formSteps={formFourSteps}
          />

          <AddFoodModal
            scrollEnd={() => scrollToEnd(scrollViewRef)}
            modalVisible={openAddFoodModal}
            setModalVisible={setOpenAddFoodModal}
            formSteps={formThreeSteps}
          />
        </Container>
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
