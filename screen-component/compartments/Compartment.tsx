import { Animated, ScrollView, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Food } from '../../constant/foods';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { FoodLocation } from '../../constant/fridgeInfo';
import { BLUE, GRAY, LIGHT_GRAY } from '../../constant/colors';
import { useGetFoodList } from '../../hooks';
import { formTwoSteps } from '../../constant/formInfo';
import { useSelector } from '../../redux/hook';

import FoodDetailModal from '../modal/FoodDetailModal';
import ExpandedCompartmentModal from '../modal/ExpandedCompartmentModal';
import FoodBox from './FoodBox';
import AddFoodBtn from '../../components/buttons/AddFoodBtn';
import DraggableFoodBox from './DraggableFoodBox';
import Icon from '../../components/common/native-component/Icon';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';

interface Props {
  foodLocation: FoodLocation;
  searchedName: string;
}

export default function Compartment({ foodLocation, searchedName }: Props) {
  const { compartmentNumToDrop } = useSelector(
    (state) => state.compartmentNumToDrop
  );
  const { currentFilter } = useSelector((state) => state.currentFilter);
  const { dragMode } = useSelector((state) => state.dragMode);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { space, compartmentNum } = foodLocation;

  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [expandCompartment, setExpandCompartment] = useState(false);

  const { getFoodList } = useGetFoodList();
  const compartmentFoodList = getFoodList('allFoods', space, compartmentNum);

  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (compartmentNumToDrop === compartmentNum) {
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      bgOpacity.setValue(0);
    }
  }, [compartmentNumToDrop]);

  return (
    <>
      <View
        style={tw`flex-1 border border-slate-500 rounded-lg ${
          dragMode ? 'bg-stone-100' : 'bg-blue-50'
        } `}
      >
        {/* 칸 정보 */}
        <View style={tw`flex-row justify-between items-center pl-2.5 h-8`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text
              style={tw`${
                compartmentFoodList.length ? 'text-blue-600' : 'text-slate-500'
              } text-sm`}
            >
              {compartmentNum}칸 | 식료품 총{' '}
              {getFoodList('allFoods', space, compartmentNum).length}개
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <AddFoodBtn foodLocation={foodLocation} />
            <TouchableOpacity
              style={tw`h-full py-1 px-2`}
              onPress={() => setExpandCompartment(true)}
              disabled={dragMode}
            >
              <Icon
                name='arrow-expand'
                size={20}
                type='MaterialCommunityIcons'
                color={dragMode ? LIGHT_GRAY : BLUE}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 식료품 리스트 */}
        {!!compartmentFoodList.length ? (
          <ScrollView
            scrollEnabled={!dragMode}
            style={tw`p-1 pt-0 flex-1`}
            contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-2 flex-wrap gap-0.5 items-center`}
            showsVerticalScrollIndicator={false}
          >
            {compartmentFoodList.map((food: Food) => (
              <DraggableFoodBox
                key={food.id}
                food={food}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                setDragPosition={setDragPosition}
                setModalVisible={setModalVisible}
                searchedName={searchedName}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={tw`flex-1 flex-row items-center pb-10 justify-center`}>
            <EmptySign message='식료품이 아직 없어요.' color='slate' />
          </View>
        )}

        {/* 이동시키는 칸 표시 생성 */}
        {compartmentNumToDrop === compartmentNum && dragMode && (
          <Animated.View
            style={{
              opacity: bgOpacity,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={tw`gap-2 border bg-blue-200 border-blue-300 rounded-lg items-center flex-1 justify-center`}
            >
              <Icon
                type='MaterialCommunityIcons'
                name='inbox-arrow-down'
                size={30}
                color={GRAY}
              />
              <Text>{compartmentNum}칸으로 이동</Text>
            </View>
          </Animated.View>
        )}
      </View>

      {/* 드래깅 시 생성되는 음식박스 */}
      {isDragging && dragMode && (
        <Animated.View
          style={{
            backgroundColor: 'fff',
            zIndex: 100,
            position: 'absolute',
            transform: [
              { translateX: dragPosition.x },
              { translateY: dragPosition.y },
            ],
          }}
        >
          <View style={tw`absolute top-0 rounded-full bg-white`}>
            <FoodBox food={selectedFood} />
          </View>
        </Animated.View>
      )}

      {expandCompartment && (
        <ExpandedCompartmentModal
          compartmentNum={compartmentNum}
          foodList={compartmentFoodList}
          expandCompartment={expandCompartment}
          setExpandCompartment={setExpandCompartment}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filter={currentFilter}
        />
      )}

      {!expandCompartment && modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formSteps={formTwoSteps}
        />
      )}
    </>
  );
}
