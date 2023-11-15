import { Animated, Keyboard, View } from 'react-native';
import { InputStyle, Text, TextInput } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { minusControlDateBtns } from '../../constant/controlDateBtns';

import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function PurchaseDateItem({ date, changeInfo }: Props) {
  const formattedDate = getFormattedDate(
    date === '' ? new Date() : new Date(date),
    'YY.MM.DD'
  );

  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 82,
    active: purchaseOpen,
  });

  useEffect(() => {
    if (date !== '') {
      setPurchaseOpen(true);
    }
  }, []);

  const changeDate = (date: Date | string) => {
    const purchaseDate = date ? getFormattedDate(date, 'YYYY-MM-DD') : '';
    return changeInfo({ purchaseDate });
  };

  const onPress = () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setPurchaseOpen((prev) => !prev);
    changeDate(!purchaseOpen ? new Date() : '');
  };

  return (
    <View>
      <FormLabel
        label='구매날짜'
        option
        isOpen={purchaseOpen}
        onPress={onPress}
      />

      <Animated.View style={tw.style(`overflow-hidden -mx-1 px-1`, { height })}>
        <View
          style={tw.style(
            `flex-row items-center ${InputStyle} p-0`,
            shadowStyle(3)
          )}
        >
          <TextInput
            editable={false}
            value={formattedDate}
            style={tw`border-0 w-23 h-full`}
          />
        </View>

        <View style={tw`mt-1.5 gap-1 flex-row flex-wrap items-start`}>
          {minusControlDateBtns.map((btn) => (
            <ControlDateBtn
              key={btn.label}
              type='minus'
              btn={btn}
              changeDate={changeDate}
              date={date}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
