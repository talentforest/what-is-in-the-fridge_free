import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from '../redux/hook';
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

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { space } = route.params as RouteParams;

  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const { getFoodList } = useGetFoodList();

  const { initializeFilter } = useHandleFilter();

  const navigation = useNavigation();

  useEffect(() => {
    initializeFilter();

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
