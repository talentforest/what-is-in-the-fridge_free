import { ScrollView, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList, useHandleFilter, useNotification } from '../hooks';
import { formThreeSteps } from '../constant/formInfo';
import {
  showCategoryModal,
  showExpiredDateModal,
  showOpenAddFoodModal,
} from '../redux/slice/modalVisibleSlice';
import { search } from '../redux/slice/food/searchedFoodSlice';
import { BGCOLOR_COMPARTMENTS } from '../constant/colors';
import { RootStackParamList } from '../navigation/Navigation';
import {
  expiredSoonFilter,
  entireFilterObj,
  expiredFilter,
  sortByOldDate,
} from '../util';

import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import ViewByCompartment from '../screen-component/compartments/ViewByCompartment';
import TableFilters from '../components/table/TableFilters';
import Container from '../components/common/Container';
import PagerView from 'react-native-pager-view';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import tw from 'twrnc';

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { space } = route.params;

  const {
    categoryModalVisible,
    expiredDateModal,
    openAddFoodModal: { modalVisible, compartmentNum },
  } = useSelector((state) => state.modalVisible);

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

  const scrollViewRef = useRef<ScrollView | null>(null);

  useNotification();

  const { getMatchedPositionFoods } = useGetFoodList();

  const foodList = getMatchedPositionFoods('allFoods', space);

  const sortedList = sortByOldDate(foodList);

  return (
    <SafeBottomAreaView>
      <Container bgColor={BGCOLOR_COMPARTMENTS}>
        <View style={tw`-mx-4 -mb-2 flex-1`}>
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
                space={space}
                scrollViewRef={scrollViewRef}
              />
            </View>

            <View key='2' style={tw`px-4 pb-2 pt-0.5`}>
              {!!foodList.length && <TableHeader length={foodList.length} />}
              <TableBody title='식료품' foodList={sortedList} />
            </View>
          </PagerView>
        </View>
      </Container>

      <FoodDetailModal formSteps={formThreeSteps} />

      <AddFoodModal
        position={{ space, compartmentNum }}
        scrollViewRef={scrollViewRef}
      />
    </SafeBottomAreaView>
  );
}
