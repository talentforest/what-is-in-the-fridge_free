import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import IconChevronRight from '../svg/arrow/IconChevronRight';
import tw from 'twrnc';

interface Props {
  name: string;
  onPress: () => void;
}

export default function OnBoardingBtn({ name, onPress }: Props) {
  const width = useRef(new Animated.Value(0)).current;

  const widthAnimation = (toValue: number) => {
    Animated.timing(width, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (name === '시작하기') {
      widthAnimation(120);
    } else {
      widthAnimation(0);
    }
  }, [name]);

  return (
    <Animated.View style={{ width }}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`bg-blue-600 shadow-md rounded-lg py-2 pl-4 pr-2`}
      >
        <View style={tw`flex-row justify-center gap-1 items-center`}>
          <Text fontSize={20} style={tw`text-white`}>
            {name}
          </Text>
          <IconChevronRight size={20} color='#fff' />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
