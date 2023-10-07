import { Animated, ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { Text, TouchableOpacity } from '../common/native-component';
import { GRAY, LIGHT_BLUE } from '../../constant/colors';
import { useOpacityAnimation } from '../../hooks';
import { CompartmentNumToDrop } from '../../redux/slice/compartmentNumToDropSlice';

import CompartmentHeader from './CompartmentHeader';
import EmptySign from '../common/EmptySign';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  title: string;
  foodList: Food[];
  spaceTotalLength: number;
  scrollEnabled: boolean;
  bgToDrop?: boolean;
  compartmentNumToDrop?: CompartmentNumToDrop;
  setExpandCompartment?: (modal: boolean) => void;
  setOpenAddFoodModal: (modal: boolean) => void;
  scrollViewRef: any;
}

export default function CompartmentBox({
  title,
  foodList,
  spaceTotalLength,
  scrollEnabled,
  children,
  bgToDrop,
  compartmentNumToDrop,
  setExpandCompartment,
  setOpenAddFoodModal,
  scrollViewRef,
}: Props) {
  const { bgOpacity } = useOpacityAnimation({
    initialValue: 0,
    active: !!bgToDrop,
  });

  return (
    <View
      style={tw`flex-1 border border-slate-300 rounded-lg ${
        !scrollEnabled ? 'bg-amber-50' : 'bg-stone-50'
      } `}
    >
      <CompartmentHeader
        title={title}
        foodList={foodList}
        spaceTotalLength={spaceTotalLength}
        setOpenAddFoodModal={setOpenAddFoodModal}
      />

      {!!foodList.length ? (
        <ScrollView
          ref={scrollViewRef}
          disableScrollViewPanResponder
          scrollEnabled={scrollEnabled}
          style={tw`px-1 flex-1`}
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-2 flex-wrap gap-1.3 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 flex-row items-center pb-5 justify-center`}>
          <EmptySign message='식료품이 아직 없어요.' />
        </View>
      )}
      {setExpandCompartment && (
        <TouchableOpacity
          onPress={() => {
            setExpandCompartment(true);
          }}
          style={tw`absolute border border-white right-1.5 bottom-1.5`}
          disabled={false}
        >
          <Icon
            type='MaterialCommunityIcons'
            name='resize-bottom-right'
            size={30}
            color={LIGHT_BLUE}
          />
        </TouchableOpacity>
      )}

      {/* 이동시키는 칸 표시 생성 */}
      {bgToDrop && (
        <Animated.View
          style={{
            opacity: bgOpacity,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <View
            style={tw`gap-2 border bg-amber-100 border-amber-400 rounded-lg items-center flex-1 justify-center`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='inbox-arrow-down'
              size={30}
              color={GRAY}
            />
            <Text>{compartmentNumToDrop}칸으로 이동</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
