import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { useHandleFilter } from '../hooks';
import { entireFilterObj, expiredFilters, scrollToEnd } from '../util';
import { formFourSteps } from '../constant/formInfo';

import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import CompartmentBox from '../components/compartment/CompartmentBox';
import AddFoodModal from '../screen-component/modal/AddFoodModal';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { initializeFilter } = useHandleFilter();

  useEffect(() => {
    initializeFilter();
  }, []);

  const scrollEnd = () => scrollToEnd(scrollViewRef);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView>
        <Container>
          <TableFilters
            filterTagList={[entireFilterObj, ...expiredFilters]}
            foodList={pantryFoods}
          />
          <CompartmentContainer>
            <CompartmentBox
              scrollViewRef={scrollViewRef}
              foodList={pantryFoods}
            />
          </CompartmentContainer>

          <FoodDetailModal formSteps={formFourSteps} />

          <AddFoodModal scrollEnd={scrollEnd} />
        </Container>
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
