import { View } from 'react-native';
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
import tw from 'twrnc';
import { search } from '../redux/slice/food/searchedFoodSlice';
import HeaderIconBtn from '../components/buttons/HeaderIconBtn';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';

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

  const { getMatchedPositionFoods } = useGetFoodList();

  const { initializeFilter } = useHandleFilter();

  const { getFilteredFoodList } = useGetFoodList();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onChangePress = () => {
    dispatch(
      changeSetting({
        ...fridgeInfo,
        insideDisplayType:
          fridgeInfo.insideDisplayType === '칸별로 보기'
            ? '목록으로 보기'
            : '칸별로 보기',
      })
    );
  };

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
      headerTitle: () => <NavigationHeaderTitle title={`${space} 식료품`} />,
      headerStyle: {
        backgroundColor: TAB_BLUE_BG_COLOR,
      },
      headerRight: () => (
        <HeaderIconBtn
          btn={fridgeInfo.insideDisplayType}
          onPress={onChangePress}
        />
      ),
    });

    return () => {
      dispatch(search(''));
    };
  }, [space]);

  const maxCompartmentNum = fridgeInfo.compartments[space];

  const compartments = getCompartments(maxCompartmentNum);

  const foodList = getMatchedPositionFoods('allFoods', space);

  const foods = getFilteredFoodList(filter, foodList);

  return (
    <SafeBottomAreaView>
      <Container>
        <View style={tw`flex-1 -mt-2`}>
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
        </View>
      </Container>
    </SafeBottomAreaView>
  );
}
