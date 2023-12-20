import { ScrollView, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { formThreeSteps } from '../constant/formInfo';
import {
  showCategoryModal,
  showExpiredDateModal,
  showOpenAddFoodModal,
} from '../redux/slice/modalVisibleSlice';
import { search } from '../redux/slice/food/searchedFoodSlice';
import { viewingArr } from '../constant/viewing';
import { entireFilterObj, expiredFilters, sortByOldDate } from '../util';

import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import TableBody from '../components/table/TableBody';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import TableHeader from '../components/table/TableHeader';
import Swiper from '../components/common/Swiper';
import ViewByCompartment from '../screen-component/compartments/ViewByCompartment';
import TableFilters from '../components/table/TableFilters';
import tw from 'twrnc';

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { space } = route.params as RouteParams;

  const { filter } = useSelector((state) => state.filter);

  const {
    categoryModalVisible,
    expiredDateModal,
    openAddFoodModal: { modalVisible, compartmentNum },
  } = useSelector((state) => state.modalVisible);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { getMatchedPositionFoods, getFilteredFoodList } = useGetFoodList();

  const foodList = getMatchedPositionFoods('allFoods', space);

  const filteredList = getFilteredFoodList(filter, foodList);

  const sortedFilterList = sortByOldDate(filteredList);

  const { initializeFilter } = useHandleFilter();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const closeAllModals = () => {
    if (categoryModalVisible) {
      dispatch(showCategoryModal(false));
    }
    if (expiredDateModal) {
      dispatch(showExpiredDateModal(false));
    }
    if (modalVisible) {
      dispatch(showOpenAddFoodModal(false));
    }
  };

  useEffect(() => {
    initializeFilter();

    closeAllModals();

    navigation.setOptions({
      headerTitle: () => <NavigationHeaderTitle title={`${space} 식료품`} />,
    });

    return () => {
      dispatch(search(''));
    };
  }, [space]);

  return (
    <SafeBottomAreaView>
      <View style={tw`px-4`}>
        <TableFilters
          filterTagList={[entireFilterObj, ...expiredFilters]}
          foodList={foodList}
        />
      </View>

      <Swiper headerIcon steps={viewingArr} foodList={foodList}>
        {viewingArr.map(({ step, name }) => (
          <View key={step} style={tw`w-full px-4 pb-4`}>
            {name === '칸별로 보기' && (
              <ViewByCompartment
                foodList={foodList}
                space={space}
                scrollViewRef={scrollViewRef}
              />
            )}

            {name === '목록으로 보기' && (
              <>
                {sortedFilterList?.length ? <TableHeader /> : <></>}
                <TableBody title='식료품' foodList={sortedFilterList} />
              </>
            )}
          </View>
        ))}
      </Swiper>

      <FoodDetailModal formSteps={formThreeSteps} />

      <AddFoodModal
        position={{ space, compartmentNum }}
        scrollViewRef={scrollViewRef}
      />
    </SafeBottomAreaView>
  );
}
