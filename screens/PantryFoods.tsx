import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { ScrollView, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { useHandleFilter, useNotification } from '../hooks';
import { formThreeSteps } from '../constant/formInfo';
import {
  expiredSoonFilter,
  entireFilterObj,
  expiredFilter,
  sortByOldDate,
} from '../util';
import { BGCOLOR_PANTRYFOODS } from '../constant/colors';

import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import TableBody from '../components/table/TableBody';
import ViewByCompartment from '../screen-component/compartments/ViewByCompartment';
import TableFilters from '../components/table/TableFilters';
import Container from '../components/common/Container';
import PagerView from 'react-native-pager-view';
import TableHeader from '../components/table/TableHeader';
import tw from 'twrnc';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { initializeFilter } = useHandleFilter();

  useNotification();

  useEffect(() => {
    initializeFilter();
  }, []);

  const foodList = sortByOldDate(pantryFoods);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView>
        <Container bgColor={BGCOLOR_PANTRYFOODS}>
          <View style={tw`flex-1 -mx-4 -mb-2`}>
            <PagerView style={tw`flex-1`}>
              <View key='1' style={tw`px-4 pb-2`}>
                <TableFilters
                  filterTagList={[
                    entireFilterObj,
                    expiredFilter,
                    expiredSoonFilter,
                  ]}
                  foodList={foodList}
                />

                <ViewByCompartment
                  foodList={foodList}
                  space='실온보관'
                  scrollViewRef={scrollViewRef}
                />
              </View>

              <View key='2' style={tw`px-4 pb-2 pt-0.5`}>
                {!!foodList.length && <TableHeader length={foodList.length} />}
                <TableBody title='식료품' foodList={foodList} />
              </View>
            </PagerView>
          </View>
        </Container>

        <FoodDetailModal formSteps={formThreeSteps} />

        <AddFoodModal scrollViewRef={scrollViewRef} />
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
