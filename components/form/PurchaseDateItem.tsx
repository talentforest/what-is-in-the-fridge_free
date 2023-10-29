import { Animated, Keyboard, View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import {
  formattedToday,
  getColorByLeftDay,
  getDiffDate,
  getFormattedDate,
  getRelativeTime,
  getTWColorByLeftDay,
} from '../../util';
import { useEffect, useState } from 'react';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';

import FormLabel from './FormLabel';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';
import ControlDateBtn from '../buttons/ControlDateBtn';
import {
  controlDateBtns,
  minusControlDateBtns,
} from '../../constant/controlDateBtns';

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
    toValue: 91,
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

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
        }}
      >
        <View
          style={tw.style(
            `h-11 mx-1 px-2 border border-slate-300 bg-white rounded-lg flex-row items-center`,
            shadowStyle(3)
          )}
        >
          <TextInput
            value={formattedDate}
            editable={false}
            pointerEvents='none'
            style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
          />

          <Text style={tw`text-sm ${getTWColorByLeftDay(date)}`}>
            {getRelativeTime(date)}
          </Text>
        </View>

        <View style={tw`mt-2 gap-1 flex-row flex-wrap items-start`}>
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
