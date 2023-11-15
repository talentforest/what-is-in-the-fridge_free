import { Animated, Keyboard, View } from 'react-native';
import { useEffect, useState } from 'react';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { comma } from '../../util/commaNotation';

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
    toValue: 48,
    active: isQuanityOpen,
  });

  useEffect(() => {
    if (quantity !== '') {
      setQuantityOpen(true);
    }
  }, []);

  const onChangeText = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    const trimmedText = numericText.replace(/^0+/, '');

    changeInfo({ quantity: trimmedText });
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

  const onHandleCountPress = (btn: string) => {
    if (btn === 'plus') {
      Keyboard.dismiss();
      onChangeText(`${+quantity + 1}`);
    }
    if (btn === 'minus') {
      Keyboard.dismiss();
      if (+quantity <= 1) return onChangeText('1');
      onChangeText(`${+quantity - 1}`);
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
        <View style={tw`flex-row items-center gap-1 p-1 -mt-1`}>
          <TextInput
            style={tw.style(`flex-1`, shadowStyle(3))}
            onChangeText={onChangeText}
            value={comma(quantity)}
            focusable={false}
            keyboardType='number-pad'
            placeholder='1'
          />

          {['plus', 'minus'].map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => onHandleCountPress(btn)}
              style={tw.style(
                `h-10 w-11 flex-row border border-slate-300 
                ${btn === 'plus' ? 'bg-stone-700' : 'bg-slate-500'}
                rounded-xl justify-center items-center`,
                shadowStyle(4)
              )}
            >
              <Icon
                name={btn === 'minus' ? 'dash' : 'plus'}
                type='Octicons'
                size={16}
                color='#fff'
              />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
