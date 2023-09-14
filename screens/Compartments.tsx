import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { entireFilterObj, expiredFilters, getCompartments } from '../util';
import { Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList } from '../hooks';
import { changeFilter } from '../redux/slice/filterSlice';
import { FRIDGE_COLOR } from '../screen-component/my-fridge/FridgeShape';

import Compartment from '../screen-component/compartments/Compartment';
import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import tw from 'twrnc';
import { toggleDragMode } from '../redux/slice/dragModeSlice';

type RouteParams = {
  space: Space;
  searchedName: string;
};

interface Route {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: Route) {
  const { currentFilter } = useSelector((state) => state.currentFilter);
  const { dragMode } = useSelector((state) => state.dragMode);
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space, searchedName } = route.params as RouteParams;

  const { getFoodList, getFilteredFoodList } = useGetFoodList();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: space,
    });
    if (currentFilter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  }, []);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  return (
    <TouchableWithoutFeedback
      style={tw`flex-1 border-2`}
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

          <View
            style={tw`${FRIDGE_COLOR} shadow-xl p-2.5 gap-2.5 flex-1 border border-slate-300 w-full m-auto self-center justify-center rounded-lg`}
          >
            {compartments.map((compartment) => (
              <Compartment
                key={compartment.compartmentNum}
                foodLocation={{ ...compartment, space }}
                searchedName={searchedName}
                foodLengthBySpace={getFoodList('fridgeFoods', space).length}
              />
            ))}
          </View>
        </Container>
      </SafeBottomAreaView>
    </TouchableWithoutFeedback>
  );
}
