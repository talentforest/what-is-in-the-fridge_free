import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { entireFilterObj, expiredFilters, scrollToEnd } from '../util';
import { formFourSteps } from '../constant/formInfo';

import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import CompartmentBox from '../components/compartment/CompartmentBox';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import AddCircleBtn from '../components/buttons/AddCircleBtn';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { pantryFilter } = useSelector((state) => state.filter);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { initializeFilter } = useHandleFilter();

  const { getFilteredFoodList } = useGetFoodList();

  useEffect(() => {
    initializeFilter();
  }, []);

  const scrollEnd = () => scrollToEnd(scrollViewRef);

  const foods = getFilteredFoodList(pantryFilter, pantryFoods);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView>
        <Container>
          {pantryFoods.length ? (
            <TableFilters
              filterTagList={[entireFilterObj, ...expiredFilters]}
              foodList={pantryFoods}
            />
          ) : (
            <></>
          )}

          <CompartmentContainer>
            <CompartmentBox
              scrollViewRef={scrollViewRef}
              foodList={pantryFoods}
            />
          </CompartmentContainer>

          <>
            {foods.length ? <TableHeader /> : <></>}

            <TableBody title='식료품' foodList={foods} />

            <AddCircleBtn />
          </>

          <FoodDetailModal formSteps={formFourSteps} />

          <AddFoodModal scrollEnd={scrollEnd} />
        </Container>
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
