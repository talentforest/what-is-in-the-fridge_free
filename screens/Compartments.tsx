import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from '../redux/hook';
import { entireFilterObj, expiredFilters, getCompartments } from '../util';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList, useHandleFilter } from '../hooks';
import { TAB_BLUE_BG_COLOR } from '../constant/colors';

import Compartment from '../screen-component/compartments/Compartment';
import Container from '../components/common/Container';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import TableFilters from '../components/table/TableFilters';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as RouteParams;

  const { getFoodList, getFilteredFoodList } = useGetFoodList();

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

  return (
    <SafeBottomAreaView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, ...expiredFilters]}
          getTableList={getFilteredFoodList}
          foodList={getFoodList('fridgeFoods', space)}
        />

        <CompartmentContainer>
          {compartments.map((compartment) => (
            <Compartment
              key={compartment.compartmentNum}
              foodLocation={{ ...compartment, space }}
            />
          ))}
        </CompartmentContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
