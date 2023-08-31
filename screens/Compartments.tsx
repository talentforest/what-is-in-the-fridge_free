import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from '../redux/hook';
import {
  Filter,
  entireFilterObj,
  expiredFilters,
  getCompartments,
} from '../util';
import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { RootStackParamList } from '../navigation/Navigation';
import { SafeBottomAreaView } from '../components/common/native-component';
import { useGetFoodList } from '../hooks';

import Compartment from '../screen-component/compartments/Compartment';
import Container from '../components/common/Container';
import HeaderBtn from '../components/buttons/HeaderBtn';
import TableFilters from '../components/table/TableFilters';
import tw from 'twrnc';

export type CompartmentNumToDrop = CompartmentNum | '동일칸';

interface RouteParams {
  route: RouteProp<RootStackParamList, 'Compartments'>;
}

export default function Compartments({ route }: RouteParams) {
  const [currentFilter, setCurrentFilter] = useState<Filter>('전체');
  const [compartmentNumToDrop, setCompartmentNumToDrop] =
    useState<CompartmentNumToDrop>('동일칸');
  const [moveMode, setMoveMode] = useState(false);

  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { space } = route.params as { space: Space };

  const navigation = useNavigation();
  const { getFoodList, getFilteredFoodList } = useGetFoodList();

  useEffect(() => {
    navigation.setOptions({
      title: space,
      headerRight: () => (
        <HeaderBtn
          iconName={moveMode ? 'check' : 'drag'}
          onPress={() => setMoveMode((prev) => !prev)}
          type='MaterialCommunityIcons'
          size={24}
        />
      ),
    });
  }, [moveMode]);

  const compartments = getCompartments(fridgeInfo.compartments[space]);

  const changeFilter = (currentFilter: Filter) => {
    setCurrentFilter(currentFilter);
  };

  return (
    <SafeBottomAreaView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, ...expiredFilters]}
          currentFilter={currentFilter}
          changeFilter={changeFilter}
          getTableList={getFilteredFoodList}
          list={getFoodList('expiredFoods', space)}
        />
        <View
          style={tw`p-2.5 gap-2.5 flex-1 border border-slate-500 w-full m-auto self-center justify-center rounded-lg bg-neutral-300`}
        >
          {compartments.map((compartment) => (
            <Compartment
              key={compartment.compartmentNum}
              currentFilter={currentFilter}
              moveMode={moveMode}
              foodLocation={{ ...compartment, space }}
              compartmentNumToDrop={compartmentNumToDrop}
              setCompartmentNumToDrop={setCompartmentNumToDrop}
            />
          ))}
        </View>
      </Container>
    </SafeBottomAreaView>
  );
}
