import { useDispatch, useSelector } from '../../redux/hook';
import { Animated, View } from 'react-native';
import { useEffect, useState } from 'react';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { useItemSlideAnimation } from '../../hooks';
import { closeKeyboard, comma } from '../../util';

import ChevronToggleBtn from '../buttons/ChevronToggleBtn';
import FormLabel from './FormLabel';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function QuantityItem() {
  const {
    formFood: { quantity },
  } = useSelector((state) => state.formFood);

  const [isQuanityOpen, setQuantityOpen] = useState(false);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 48,
    active: isQuanityOpen,
  });

  useEffect(() => {
    if (quantity !== '') {
      setQuantityOpen(true);
    }
  }, []);

  const dispatch = useDispatch();

  const onChangeText = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    const trimmedText = numericText.replace(/^0+/, '');

    dispatch(editFormFood({ quantity: trimmedText }));
  };

  const onPress = () => {
    closeKeyboard();
    setQuantityOpen((prev) => !prev);
    if (!isQuanityOpen) {
      return dispatch(editFormFood({ quantity: '1' }));
    }
    if (isQuanityOpen) {
      return dispatch(editFormFood({ quantity: '' }));
    }
  };

  const onHandleCountPress = (btn: string) => {
    if (btn === 'plus') {
      closeKeyboard();
      onChangeText(`${+quantity + 1}`);
    }
    if (btn === 'minus') {
      closeKeyboard();
      if (+quantity <= 1) return onChangeText('1');
      onChangeText(`${+quantity - 1}`);
    }
  };

  return (
    <View>
      <FormLabel label='수량'>
        <ChevronToggleBtn onPress={onPress} isOpen={isQuanityOpen} />
      </FormLabel>

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
          marginTop: -4,
        }}
      >
        <View style={tw`flex-row items-center gap-1 p-1`}>
          <TextInput
            style={tw.style(`flex-1`)}
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
                `h-10 w-11 flex-row border border-slate-400 
                ${btn === 'plus' ? 'bg-stone-700' : 'bg-slate-500'}
                rounded-xl justify-center items-center`
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
