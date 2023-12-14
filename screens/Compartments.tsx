import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { entireFilterObj, expiredFilters, getCompartments } from '../util';
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

import Compartment from '../components/compartment/Compartment';
import Container from '../components/common/Container';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import TableFilters from '../components/table/TableFilters';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import TableBody from '../components/table/TableBody';
import AddCircleBtn from '../components/buttons/AddCircleBtn';
import AddFoodModal from '../screen-component/modal/AddFoodModal';
import TableHeader from '../components/table/TableHeader';

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { space } = route.params as RouteParams;

  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { categoryModalVisible, expiredDateModal, openAddFoodModal } =
    useSelector((state) => state.modalVisible);
  const { filter } = useSelector((state) => state.filter);

  const { getFoodList } = useGetFoodList();

  const { initializeFilter } = useHandleFilter();

  const { getFilteredFoodList } = useGetFoodList();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    initializeFilter();
    if (categoryModalVisible) {
      dispatch(showCategoryModal(false));
    }
    if (expiredDateModal) {
      dispatch(showExpiredDateModal(false));
    }
    if (openAddFoodModal) {
      dispatch(showOpenAddFoodModal(false));
    }

    navigation.setOptions({
      headerTitle: () => <NavigationHeaderTitle title={space} />,
      headerStyle: {
        backgroundColor: TAB_BLUE_BG_COLOR,
      },
    });
  }, [space]);

  const maxCompartmentNum = fridgeInfo.compartments[space];

  const compartments = getCompartments(maxCompartmentNum);

  const foodList = getFoodList('fridgeFoods', space);

  const foods = getFilteredFoodList(filter, foodList);

  return (
    <SafeBottomAreaView>
      <Container>
        {fridgeInfo.insideDisplayType === '칸별로 보기' ? (
          <>
            <TableFilters
              filterTagList={[entireFilterObj, ...expiredFilters]}
              foodList={foodList}
            />
            <CompartmentContainer>
              {compartments.map((compartment) => (
                <Compartment
                  key={compartment.compartmentNum}
                  currPosition={{ ...compartment, space }}
                />
              ))}
            </CompartmentContainer>
          </>
        ) : null}

        {fridgeInfo.insideDisplayType === '목록으로 보기' ? (
          <>
            {foods.length ? <TableHeader /> : <></>}

            <TableBody title='식료품' foodList={foods} />

            <AddCircleBtn />

            <AddFoodModal currPosition={{ space, compartmentNum: '1번' }} />
          </>
        ) : null}

        <FoodDetailModal formSteps={formFourSteps} />
      </Container>
    </SafeBottomAreaView>
  );
}
