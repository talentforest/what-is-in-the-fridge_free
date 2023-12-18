import { ScrollView, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { TAB_BLUE_BG_COLOR } from '../constant/colors';
import { formFourSteps } from '../constant/formInfo';
import {
  showCategoryModal,
  showExpiredDateModal,
  showOpenAddFoodModal,
} from '../redux/slice/modalVisibleSlice';
import { search } from '../redux/slice/food/searchedFoodSlice';
import { viewingArr } from '../constant/viewing';

import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import TableBody from '../components/table/TableBody';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import TableHeader from '../components/table/TableHeader';
import Swiper from '../components/common/Swiper';
import ViewByCompartment from '../screen-component/compartments/ViewByCompartment';
import tw from 'twrnc';
import { sortByOldDate } from '../util';

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { space } = route.params as RouteParams;

  const {
    categoryModalVisible,
    expiredDateModal,
    openAddFoodModal: { modalVisible, compartmentNum },
  } = useSelector((state) => state.modalVisible);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { getMatchedPositionFoods } = useGetFoodList();

  const foodList = getMatchedPositionFoods('allFoods', space);

  const sortedList = sortByOldDate(foodList);

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
      headerStyle: { backgroundColor: TAB_BLUE_BG_COLOR },
    });

    return () => {
      dispatch(search(''));
    };
  }, [space]);

  return (
    <SafeBottomAreaView>
      <Swiper headerIcon steps={viewingArr}>
        {viewingArr.map(({ step, name }) => (
          <View key={step} style={tw`w-full px-4 pb-4 pt-2`}>
            {name === '칸별로 보기' && (
              <ViewByCompartment
                foodList={foodList}
                space={space}
                scrollViewRef={scrollViewRef}
              />
            )}

            {name === '목록으로 보기' && (
              <>
                {foodList.length ? <TableHeader /> : <></>}
                <TableBody title='식료품' foodList={sortedList} />
              </>
            )}
          </View>
        ))}
      </Swiper>

      <FoodDetailModal formSteps={formFourSteps} />

      <AddFoodModal
        position={{ space, compartmentNum }}
        scrollViewRef={scrollViewRef}
      />
    </SafeBottomAreaView>
  );
}
