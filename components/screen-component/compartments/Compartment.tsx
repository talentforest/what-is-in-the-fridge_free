import { Animated, ScrollView, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { GRAY } from '../../../constant/colors';
import { CompartmentNumToDrop } from '../../../screens/Compartments';
import { Filter } from '../../../util';

import useGetFoodList from '../../../hooks/useGetFoodList';
import useToggleModal from '../../../hooks/useToggleModal';

import FoodDetailModal from '../modal/FoodDetailModal';
import FoodBox from './FoodBox';
import AddFoodBtn from '../../common/buttons/AddFoodBtn';
import DraggableFoodBox from './DraggableFoodBox';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  currentFilter: Filter;
  foodLocation: FoodLocation;
  moveMode: boolean;
  compartmentNumToDrop: CompartmentNumToDrop;
  setCompartmentNumToDrop: (compartmentNum: CompartmentNumToDrop) => void;
}

export default function Compartment({
  currentFilter,
  foodLocation,
  moveMode,
  compartmentNumToDrop,
  setCompartmentNumToDrop,
}: Props) {
  const { space, compartmentNum } = foodLocation;

  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [compartmentHeight, setCompartmentHeight] = useState(0);

  const onLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setCompartmentHeight(height);
  }, []);

  const { modalVisible, setModalVisible } = useToggleModal();
  const { getFoodList } = useGetFoodList();

  const bgOpacity = useRef(new Animated.Value(0)).current;
  const titleColor = getFoodList(space, compartmentNum).length
    ? 'text-blue-600'
    : 'text-slate-500';

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
        onLayout={onLayout}
        style={tw`flex-1 border border-slate-500 rounded-lg bg-stone-100`}
      >
        {/* 칸 정보 */}
        <View style={tw`flex-row justify-between items-center pl-2.5 h-8`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`${titleColor}`}>
              {compartmentNum}칸 | 식료품 총{' '}
              {getFoodList(space, compartmentNum).length}개
            </Text>
          </View>
          <AddFoodBtn foodLocation={foodLocation} moveMode={moveMode} />
        </View>

        {/* 식료품 리스트 */}
        <ScrollView
          scrollEnabled={!moveMode}
          style={tw`p-1 pt-0 flex-1`}
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-2 flex-wrap gap-0.5 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {getFoodList(space, compartmentNum).map((food: Food) =>
            !moveMode ? (
              <TouchableOpacity
                key={food.id}
                onPress={() => {
                  setSelectedFood(food);
                  setModalVisible(true);
                }}
                style={tw`rounded-full`}
              >
                <FoodBox
                  food={food}
                  moveMode={moveMode}
                  filter={currentFilter}
                />
              </TouchableOpacity>
            ) : (
              <DraggableFoodBox
                key={food.id}
                food={food}
                filter={currentFilter}
                moveMode={moveMode}
                setCompartmentNumToDrop={setCompartmentNumToDrop}
                compartmentHeight={compartmentHeight}
                setSelectedFood={setSelectedFood}
                setIsDragging={setIsDragging}
                setDragPosition={setDragPosition}
              />
            )
          )}
        </ScrollView>

        {compartmentNumToDrop === compartmentNum && (
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
      {isDragging && (
        <Animated.View
          style={{
            zIndex: 100,
            position: 'absolute',
            transform: [
              { translateX: dragPosition.x },
              { translateY: dragPosition.y },
            ],
          }}
        >
          <View style={tw`absolute top-0 rounded-full`}>
            <FoodBox
              food={selectedFood}
              moveMode={moveMode}
              filter={currentFilter}
            />
          </View>
        </Animated.View>
      )}

      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          food={selectedFood}
          formSteps={[
            { id: 1, name: '식품 정보' },
            { id: 2, name: '식품 날짜' },
          ]}
        />
      )}
    </>
  );
}
