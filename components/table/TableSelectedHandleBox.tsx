import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import { useItemSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { ReactNode } from 'react';
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
    <Animated.View style={tw.style(`overflow-hidden -mx-4 px-4`, { height })}>
      <View style={tw.style(`flex-row justify-between items-center h-full`)}>
        <View style={tw`justify-center`}>
          <CheckBoxItem
            onPress={onAllCheckBtnPress}
            checked={entireChecked}
            title='전체 선택'
            inActiveColor='#333'
          />
          {!!checkedList.length && (
            <Text fontSize={16} style={tw`ml-5.5 text-blue-600 -mt-1`}>
              {checkedList.length}개 선택
            </Text>
          )}
        </View>

        <View style={tw`flex-row justify-between items-center`}>
          {children}
        </View>
      </View>
    </Animated.View>
  );
}
