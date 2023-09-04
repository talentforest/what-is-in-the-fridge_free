import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { BLUE } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  name: string;
  onPress: () => void;
}

export default function SquareBtn({ name, onPress }: Props) {
  const width = useRef(new Animated.Value(80)).current;

  const activeColor = 'bg-blue-600 text-white border-blue-300';
  const defaultColor = 'bg-white border-blue-300 text-blue-600';
  const color = name === '들어가기' ? activeColor : defaultColor;

  const widthAnimation = (toValue: number) => {
    Animated.timing(width, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (name === '들어가기') {
      widthAnimation(140);
    } else {
      widthAnimation(80);
    }
  }, [name]);

  return (
    <Animated.View style={{ width }}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`${color} h-12 flex-row justify-center gap-1 items-center py-1.5 pl-4 pr-3 rounded-lg border`}
      >
        <Text style={tw`text-lg pb-0.5 ${color}`}>{name}</Text>
        <Icon
          name='chevron-right'
          type='Feather'
          size={21}
          color={name === '들어가기' ? '#fff' : BLUE}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
