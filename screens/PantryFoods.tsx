import { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/common/native-component';
import { LayoutChangeEvent, ScrollView } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { useGetFoodList } from '../hooks';
import { entireFilterObj, expiredFilters } from '../util';
import { formFourSteps, formThreeSteps } from '../constant/formInfo';
import { useFocusEffect } from '@react-navigation/native';
import { changePantryFilter } from '../redux/slice/filterSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { shadowStyle } from '../constant/shadowStyle';
import { PlatformIOS } from '../constant/statusBarHeight';
import { Food } from '../constant/foodInfo';

import Container from '../components/common/Container';
import TableFilters from '../components/table/TableFilters';
import FoodBox from '../components/common/FoodBox';
import FoodDetailModal from '../screen-component/modal/FoodDetailModal';
import CompartmentContainer from '../components/compartment/CompartmentContainer';
import CompartmentBox from '../components/compartment/CompartmentBox';
import AddFoodModal from '../screen-component/modal/AddFoodModal';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { pantryFilter } = useSelector((state) => state.filter);
  const { searchedFoodName } = useSelector((state) => state.searchedFoodName);
  const [openFoodDetailModal, setOpenFoodDetailModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const { getFilteredFoodList } = useGetFoodList();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (pantryFilter !== '전체') {
          dispatch(changePantryFilter('전체'));
        }
      };
    }, [])
  );

  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollEnd = () => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  };

  const onItemLayout = (event: LayoutChangeEvent, food: Food) => {
    if (searchedFoodName === food.name) {
      const { y } = event.nativeEvent.layout;
      scrollViewRef?.current?.scrollTo({ y, animated: true });
    }
    return null;
  };

  return (
    <KeyboardAvoidingView>
      <Container>
        <TableFilters
          filterList={[entireFilterObj, ...expiredFilters]}
          getTableList={getFilteredFoodList}
          foodList={pantryFoods}
        />

        <CompartmentContainer>
          <CompartmentBox
            scrollViewRef={scrollViewRef}
            title='팬트리'
            foodList={pantryFoods}
            spaceTotalLength={pantryFoods.length}
            setOpenAddFoodModal={setOpenAddFoodModal}
          >
            {pantryFoods.map((food) => (
              <TouchableOpacity
                key={food.id}
                onPress={() => {
                  dispatch(select(food));
                  setOpenFoodDetailModal(true);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  ...shadowStyle(PlatformIOS ? 3 : 10),
                }}
                onLayout={(event: LayoutChangeEvent) => {
                  onItemLayout(event, food);
                }}
              >
                <FoodBox food={food} />
              </TouchableOpacity>
            ))}
          </CompartmentBox>
        </CompartmentContainer>

        <FoodDetailModal
          modalVisible={openFoodDetailModal}
          setModalVisible={setOpenFoodDetailModal}
          formSteps={formFourSteps}
        />

        <AddFoodModal
          scrollEnd={scrollEnd}
          modalVisible={openAddFoodModal}
          setModalVisible={setOpenAddFoodModal}
          formSteps={formThreeSteps}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
