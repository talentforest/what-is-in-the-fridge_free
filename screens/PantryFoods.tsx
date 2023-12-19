import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { ScrollView, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { useHandleFilter } from '../hooks';
import { formTwoSteps } from '../constant/formInfo';
import { viewingArr } from '../constant/viewing';
import { sortByOldDate } from '../util';

import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import TableBody from '../components/table/TableBody';
import TableHeader from '../components/table/TableHeader';
import ViewByCompartment from '../screen-component/compartments/ViewByCompartment';
import Swiper from '../components/common/Swiper';
import tw from 'twrnc';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { initializeFilter } = useHandleFilter();

  useEffect(() => {
    initializeFilter();
  }, []);

  const foodList = sortByOldDate(pantryFoods);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView>
        <Swiper steps={viewingArr} headerIcon>
          {viewingArr.map(({ step, name }) => (
            <View key={step} style={tw`w-full px-4 pb-4 pt-2`}>
              {name === '칸별로 보기' && (
                <ViewByCompartment
                  space={'팬트리'}
                  foodList={pantryFoods}
                  scrollViewRef={scrollViewRef}
                />
              )}

              {name === '목록으로 보기' && (
                <>
                  {pantryFoods.length ? <TableHeader /> : <></>}
                  <TableBody title='식료품' foodList={foodList} />
                </>
              )}
            </View>
          ))}
        </Swiper>
        <FoodDetailModal formSteps={formTwoSteps} />

        <AddFoodModal scrollViewRef={scrollViewRef} />
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
