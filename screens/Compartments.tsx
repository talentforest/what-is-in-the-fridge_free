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

import Compartment from '../components/compartment/Compartment';
import Container from '../components/common/Container';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import TableFilters from '../components/table/TableFilters';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import {
  showCategoryModal,
  showExpiredDateModal,
  showOpenAddFoodModal,
} from '../redux/slice/modalVisibleSlice';

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

  const { getFoodList } = useGetFoodList();

  const { initializeFilter } = useHandleFilter();

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

  return (
    <SafeBottomAreaView>
      <Container>
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

        <FoodDetailModal formSteps={formFourSteps} />
      </Container>
    </SafeBottomAreaView>
  );
}
