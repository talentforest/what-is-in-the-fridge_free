import { Animated, Keyboard, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { PlatformIOS } from '../../constant/statusBarHeight';

import FormLabel from './FormLabel';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  quantity: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function QuantityItem({ quantity, changeInfo }: Props) {
  const [isQuanityOpen, setQuantityOpen] = useState(false);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 49,
    active: isQuanityOpen,
  });

  useEffect(() => {
    if (quantity !== '') {
      setQuantityOpen(true);
    }
  }, []);

  const onChangeText = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    changeInfo({ quantity: numericText });
  };

  const onPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    setQuantityOpen((prev) => !prev);
    if (!isQuanityOpen) {
      return changeInfo({ quantity: '1' });
    }
    if (isQuanityOpen) {
      return changeInfo({ quantity: '' });
    }
  };

  return (
    <View>
      <FormLabel label='수량' option isOpen={isQuanityOpen} onPress={onPress} />

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
        }}
      >
        <View style={tw`flex-row items-center gap-1 px-1`}>
          <View
            style={tw`h-11 flex-1 bg-white border border-slate-300 shadow-md flex-row items-center rounded-lg`}
          >
            <TextInput
              style={tw`bg-white border-0 m-0.5 flex-1 rounded-lg`}
              onChangeText={onChangeText}
              value={quantity}
              focusable={false}
              keyboardType='numeric'
              placeholder='1'
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              onChangeText(`${+quantity + 1}`);
            }}
            style={tw`h-11 w-12 gap-0.5 flex-row shadow-md bg-blue-100 border border-blue-300 rounded-lg justify-center items-center`}
          >
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              size={16}
              color='blue'
            />
            <Text
              style={tw.style(`text-blue-600 text-lg`, {
                fontFamily: PlatformIOS ? 'Arial' : 'Roboto',
              })}
            >
              1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (+quantity <= 1) return onChangeText('1');
              onChangeText(`${+quantity - 1}`);
            }}
            style={tw`h-11 w-12 gap-0.5 flex-row shadow-md bg-red-100 border border-red-300 rounded-lg justify-center items-center`}
          >
            <Icon
              name='minus'
              type='MaterialCommunityIcons'
              size={16}
              color='red'
            />
            <Text
              style={tw.style(`text-red-600 text-lg`, {
                fontFamily: PlatformIOS ? 'Arial' : 'Roboto',
              })}
            >
              1
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
