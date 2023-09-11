import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import { useSlideAnimation } from '../../hooks';
import { useSelector } from '../../redux/hook';
import { ReactNode } from 'react';
import tw from 'twrnc';

interface Props {
  list: Food[];
  children: ReactNode;
}

export default function TableFooter({ list, children }: Props) {
  const { showBtn } = useSelector((state) => state.showBtn);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 95,
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
            `w-full px-5 gap-2 pt-2 items-start border-t border-slate-300`
          )}
        >
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-[15px] text-blue-700 mr-1`}>
              {list.length}개의 식료품 선택
            </Text>
          </View>

          <View style={tw`gap-1 items-start flex-row`}>{children}</View>
        </View>
      </Animated.View>
    </View>
  );
}
