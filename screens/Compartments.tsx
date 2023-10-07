import { TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { entireFilterObj, expiredFilters, getCompartments } from '../util';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList } from '../hooks';
import { changeFilter } from '../redux/slice/filterSlice';
import { toggleDragMode } from '../redux/slice/dragModeSlice';
import { TAB_BLUE_BG_COLOR } from '../constant/colors';

import Compartment from '../screen-component/compartments/Compartment';
import Container from '../components/common/Container';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import TableFilters from '../components/table/TableFilters';
import tw from 'twrnc';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';

type RouteParams = {
  space: Space;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { filter } = useSelector((state) => state.filter);
  const { dragMode } = useSelector((state) => state.dragMode);
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as RouteParams;

  const { getFoodList, getFilteredFoodList } = useGetFoodList();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NavigationHeaderTitle title={space} />,
      headerStyle: {
        backgroundColor: TAB_BLUE_BG_COLOR,
      },
    });
    if (filter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  }, []);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  return (
    <TouchableWithoutFeedback
      style={tw`flex-1`}
      onPress={() => {
        if (dragMode) return dispatch(toggleDragMode(false));
      }}
    >
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
                foodLengthBySpace={getFoodList('fridgeFoods', space).length}
              />
            ))}
          </CompartmentContainer>
        </Container>
      </SafeBottomAreaView>
    </TouchableWithoutFeedback>
  );
}
