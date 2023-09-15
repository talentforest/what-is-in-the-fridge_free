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

export default function TableFooter({
  list,
  children,
  entireChecked,
  onEntirePress,
}: Props) {
  const { showBtn } = useSelector((state) => state.showBtn);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 52,
    active: !!list.length && showBtn,
  });

  return (
    <View style={tw`-mx-4 bg-stone-100`}>
      <Animated.View
        style={{
          height,
          overflow: 'hidden',
        }}
      >
        <View
          style={tw.style(
            `flex-row justify-between items-center w-full pl-6.5 pr-5 gap-1 pt-1 border-t border-slate-500`
          )}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <CheckBoxItem
              onPress={onEntirePress}
              checked={entireChecked}
              title='전체 선택'
            />
            {!entireChecked && (
              <Text style={tw`text-[14px] text-blue-700 mt-0.4`}>
                {list.length}개의 식료품 선택
              </Text>
            )}
          </View>

          <View style={tw`flex-row justify-between`}>{children}</View>
        </View>
      </Animated.View>
    </View>
  );
}
