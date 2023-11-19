import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import { useSlideAnimation } from '../../hooks';
import { useSelector } from '../../redux/hook';
import { ReactNode } from 'react';
import CheckBoxItem from '../common/CheckBoxItem';
import tw from 'twrnc';

interface Props {
  checkedList: Food[];
  foodList: () => Food[];
  onEntirePress: (list: Food[]) => void;
  children: ReactNode;
}

export default function TableSelectedHandleBox({
  checkedList,
  foodList,
  children,
  onEntirePress,
}: Props) {
  const { showBtn } = useSelector((state) => state.showBtn);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 72,
    active: !!checkedList.length && showBtn,
  });

  const entireChecked =
    checkedList.length === foodList().length && !!checkedList.length;

  const onEntireBtnPress = () => onEntirePress(foodList());

  return (
    <Animated.View style={tw.style(`overflow-hidden -mx-4 px-4`, { height })}>
      <View style={tw.style(`flex-row justify-between items-center h-full`)}>
        <View style={tw`justify-center`}>
          <CheckBoxItem
            onPress={onEntireBtnPress}
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
