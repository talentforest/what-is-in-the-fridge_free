import { Animated, ScrollView, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Food, initialFoodInfo } from '../../constant/foods';
import { Text } from '../../components/common/native-component';
import { FoodLocation } from '../../constant/fridgeInfo';
import { GRAY } from '../../constant/colors';
import { CompartmentNumToDrop } from '../../screens/Compartments';
import { Filter } from '../../util';
import { useGetFoodList } from '../../hooks';

import FoodDetailModal from '../modal/FoodDetailModal';
import FoodBox from './FoodBox';
import AddFoodBtn from '../../components/buttons/AddFoodBtn';
import DraggableFoodBox from './DraggableFoodBox';
import Icon from '../../components/common/native-component/Icon';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';

interface Props {
  currentFilter: Filter;
  foodLocation: FoodLocation;
  moveMode: boolean;
  setMoveMode: (moveMode: boolean) => void;
  compartmentNumToDrop: CompartmentNumToDrop;
  setCompartmentNumToDrop: (compartmentNum: CompartmentNumToDrop) => void;
}

export default function Compartment({
  currentFilter,
  foodLocation,
  moveMode,
  setMoveMode,
  compartmentNumToDrop,
  setCompartmentNumToDrop,
}: Props) {
  const { space, compartmentNum } = foodLocation;

  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const { getFoodList } = useGetFoodList();

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

  const titleColor = getFoodList('allFoods', space, compartmentNum).length
    ? 'text-blue-600'
    : 'text-slate-500';

  return (
    <>
      <View
        style={tw`flex-1 border border-slate-500 rounded-lg ${
          moveMode ? 'bg-blue-50' : 'bg-stone-100'
        } `}
      >
        {/* 칸 정보 */}
        <View style={tw`flex-row justify-between items-center pl-2.5 h-8`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`${titleColor} text-sm`}>
              {compartmentNum}칸 | 식료품 총{' '}
              {getFoodList('allFoods', space, compartmentNum).length}개
            </Text>
          </View>
          <AddFoodBtn foodLocation={foodLocation} moveMode={moveMode} />
        </View>

        {/* 식료품 리스트 */}
        {!!getFoodList('allFoods', space, compartmentNum).length ? (
          <ScrollView
            scrollEnabled={!moveMode}
            style={tw`p-1 pt-0 flex-1`}
            contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-2 flex-wrap gap-0.5 items-center`}
            showsVerticalScrollIndicator={false}
          >
            {getFoodList('allFoods', space, compartmentNum).map(
              (food: Food) => (
                <DraggableFoodBox
                  key={food.id}
                  food={food}
                  filter={currentFilter}
                  moveMode={moveMode}
                  setCompartmentNumToDrop={setCompartmentNumToDrop}
                  setSelectedFood={setSelectedFood}
                  setIsDragging={setIsDragging}
                  setDragPosition={setDragPosition}
                  setMoveMode={setMoveMode}
                  setModalVisible={setModalVisible}
                />
              )
            )}
          </ScrollView>
        ) : (
          <View style={tw`flex-1 flex-row items-center pb-10 justify-center`}>
            <EmptySign message='식료품이 아직 없어요.' color='slate' />
          </View>
        )}

        {/* 이동시키는 칸 표시 생성 */}
        {compartmentNumToDrop === compartmentNum && moveMode && (
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
      {isDragging && moveMode && (
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
            { step: 1, name: '식품 정보' },
            { step: 2, name: '식품 날짜' },
          ]}
        />
      )}
    </>
  );
}
