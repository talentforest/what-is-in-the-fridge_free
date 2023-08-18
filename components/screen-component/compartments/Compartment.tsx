import { Animated, ScrollView, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { FormStep } from '../../../constant/formInfo';
import { GRAY } from '../../../constant/colors';
import { CompartmentNumToDrop } from '../../../screens/Compartments';
import { scaleH } from '../../../util';
import FoodDetailModal from '../modal/FoodDetailModal';
import FoodBox from './FoodBox';
import useGetFoodList from '../../../hooks/useGetFoodList';
import AddFoodBtn from './AddFoodBtn';
import useToggleModal from '../../../hooks/useToggleModal';
import DraggableFoodBox from '../../common/boxes/DraggableFoodBox';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodLocation: FoodLocation;
  moveMode: boolean;
  setMoveMode: (moveMode: boolean) => void;
  compartmentNumToDrop: CompartmentNumToDrop;
  setCompartmentNumToDrop: (compartmentNum: CompartmentNumToDrop) => void;
}

export default function Compartment({
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
  const [compartmentHeight, setCompartmentHeight] = useState(0);
  const onLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setCompartmentHeight(height);
  }, []);

  const { modalVisible, setModalVisible } = useToggleModal();
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

  return (
    <>
      <View
        onLayout={onLayout}
        style={tw.style(`flex-1 border border-slate-300 rounded-lg bg-white`)}
      >
        {/* 칸 정보 */}
        <View
          style={tw`flex-row justify-between items-center pl-3 pr-1.5
          h-[${scaleH(7)}]`}
        >
          <Text style={tw`text-slate-500`}>
            {compartmentNum}칸 | 식료품{' '}
            {getFoodList(space, compartmentNum).length}개
          </Text>
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
                style={tw`border-2 border-indigo-300 rounded-full`}
              >
                <FoodBox food={food} />
              </TouchableOpacity>
            ) : (
              <DraggableFoodBox
                key={food.id}
                food={food}
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
              style={tw`gap-2 border-2 bg-blue-200 border-indigo-400 rounded-lg items-center flex-1 justify-center`}
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

      {/* 드래깅 시 생성되는 컴포넌트 */}
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
          <View
            style={tw`absolute top-0 border border-indigo-400 rounded-full`}
          >
            <FoodBox food={selectedFood} />
          </View>
        </Animated.View>
      )}

      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          food={selectedFood}
          formSteps={
            [
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 날짜' },
            ] as FormStep[]
          }
        />
      )}
    </>
  );
}
