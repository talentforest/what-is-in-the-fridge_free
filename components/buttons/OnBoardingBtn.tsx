import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { BLUE } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
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
          <Text style={tw`text-white w-13`}>{name}</Text>
          <Icon name='chevron-right' type='Feather' size={21} color='#fff' />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
