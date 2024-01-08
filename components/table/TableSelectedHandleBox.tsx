import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import { useItemSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { ReactNode } from 'react';
import { shadowStyle } from '../../constant/shadowStyle';

import CheckBoxItem from '../common/CheckBoxItem';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
  children: ReactNode;
}

export default function TableSelectedHandleBox({ foodList, children }: Props) {
  const { checkedList } = useSelector((state) => state.checkedList);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 72,
    active: !!checkedList.length,
  });

  const entireChecked =
    checkedList.length === foodList.length && !!checkedList.length;

  const dispatch = useDispatch();

  const onAllCheckBtnPress = () => {
    const allChecked = checkedList.length === foodList.length;
    const toggleBtn = allChecked ? [] : foodList;
    dispatch(setCheckedList(toggleBtn));
  };

  return (
    <Animated.View
      style={tw.style(`overflow-hidden bg-indigo-400 rounded-t-3xl`, {
        height,
        ...shadowStyle(3),
      })}
    >
      <View
        style={tw.style(`flex-row justify-between items-center px-4 h-full`)}
      >
        <View style={tw`justify-between ml-2`}>
          <View style={tw`h-7`}>
            <CheckBoxItem
              onPress={onAllCheckBtnPress}
              checked={entireChecked}
              title='전체 선택'
              activeColor={'#fff'}
              inActiveColor='#fff'
            />
          </View>

          {!!checkedList.length && (
            <Text fontSize={15} style={tw`ml-5.5 text-indigo-50`}>
              {checkedList.length}개 선택
            </Text>
          )}
        </View>

        <View style={tw`flex-row justify-between items-center gap-1.5`}>
          {children}
        </View>
      </View>
    </Animated.View>
  );
}
