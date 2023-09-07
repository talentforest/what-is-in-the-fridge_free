import { useRoute } from '@react-navigation/native';
import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Food } from '../../constant/foods';
import { BLUE, GRAY } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';
import { useSelector } from '../../redux/hook';
import { ReactNode } from 'react';

import CheckBox from '../common/CheckBox';
import tw from 'twrnc';

interface Props {
  list: Food[];
  entireChecked: boolean;
  onEntirePress: () => void;
  children: ReactNode;
}

export default function TableFooter({
  list,
  entireChecked,
  onEntirePress,
  children,
}: Props) {
  const route = useRoute();
  const { showBtn } = useSelector((state) => state.showBtn);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: route.name === 'ExpiredFoods' ? 50 : 94,
    active: !!list.length && showBtn,
  });

  return (
    <View style={tw.style(`py-0.5 px-1 mb-2 bg-stone-100 border-slate-400`)}>
      <View
        style={tw.style(`border bg-stone-100 border-slate-300`, {
          shadowColor: '#aaa',
          shadowOffset: { height: -5, width: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 6,
        })}
      />
      <View style={tw`h-10 flex-row items-center justify-between`}>
        {/* 전체 선택 */}
        <TouchableOpacity
          onPress={onEntirePress}
          style={tw`justify-center h-full px-2 flex-row items-center gap-2`}
        >
          <CheckBox
            checked={entireChecked}
            activeColor={entireChecked ? BLUE : GRAY}
          />
          <Text
            style={tw`${entireChecked ? 'text-blue-600' : 'text-slate-600'}`}
          >
            전체 선택
          </Text>
        </TouchableOpacity>
        <Text style={tw`text-sm text-slate-500 mr-1`}>
          {list.length}개의 식료품 선택
        </Text>
      </View>

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          alignItems: 'flex-end',
          gap: 4,
          paddingTop: 1,
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
}
