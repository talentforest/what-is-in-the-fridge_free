import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import { useSlideAnimation } from '../../hooks';
import { useSelector } from '../../redux/hook';
import { ReactNode } from 'react';
import CheckBoxItem from '../common/CheckBoxItem';
import tw from 'twrnc';

interface Props {
  list: Food[];
  children: ReactNode;
  entireChecked: boolean;
  onEntirePress: () => void;
}

export default function TableSelectedHandleBox({
  list,
  children,
  entireChecked,
  onEntirePress,
}: Props) {
  const { showBtn } = useSelector((state) => state.showBtn);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 80,
    active: !!list.length && showBtn,
  });

  return (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      <View style={tw.style(`flex-row justify-between items-center h-full`)}>
        <View style={tw`justify-center`}>
          <CheckBoxItem
            onPress={onEntirePress}
            checked={entireChecked}
            title='전체 선택'
            inActiveColor='#333'
          />
          {!!list.length && (
            <Text style={tw`text-sm ml-6 text-blue-600`}>
              {list.length}개 선택
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
