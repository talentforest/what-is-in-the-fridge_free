import { MutableRefObject } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../common/native-component';
import { FoodPosition } from '../../constant/fridgeInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { useRouteName, useGetFoodList } from '../../hooks';
import { showExpandCompartmentModal } from '../../redux/slice/modalVisibleSlice';
import { LIGHT_BLUE } from '../../constant/colors';

import CompartmentHeader from './CompartmentHeader';
import EmptySign from '../common/EmptySign';
import FoodBox from '../common/FoodBox';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  position: FoodPosition;
  scrollViewRef: MutableRefObject<ScrollView>;
}

export default function CompartmentBox({ position, scrollViewRef }: Props) {
  const dispatch = useDispatch();

  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { space, compartmentNum } = position;

  const { routePantryFoods } = useRouteName();

  const { getMatchedPositionFoods } = useGetFoodList();

  const foodList = getMatchedPositionFoods('allFoods', space, compartmentNum);

  const foods = space === '실온보관' ? pantryFoods : foodList;

  const openExpandCompartmentPress = () =>
    dispatch(
      showExpandCompartmentModal({ modalVisible: true, compartmentNum })
    );

  return (
    <View
      style={tw.style(`flex-1 border border-slate-200 bg-white rounded-xl`)}
    >
      <CompartmentHeader compartmentNum={compartmentNum} foodList={foods} />

      {!!foods.length ? (
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled
          style={tw`px-1 flex-1`}
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-12 flex-wrap gap-1.2 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {foods.map((food: Food) => (
            <FoodBox key={food.id} food={food} scrollViewRef={scrollViewRef} />
          ))}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 mb-2 flex-row items-center justify-center`}>
          <EmptySign
            message={'아직 식료품이 없어요'}
            assetSize={32}
            compartmentNum={compartmentNum}
          />
        </View>
      )}

      {!routePantryFoods && (
        <TouchableOpacity
          onPress={openExpandCompartmentPress}
          style={tw`absolute border border-white rounded-xl p-2 left-0 bottom-0`}
          disabled={false}
        >
          <Icon
            type='Octicons'
            name='screen-full'
            size={15}
            color={LIGHT_BLUE}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
