import { Animated, Keyboard, View } from 'react-native';
import { InputStyle, TextInput } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { minusControlDateBtns } from '../../constant/controlDateBtns';

import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import RelativeTime from '../common/RelativeTime';
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
            `flex-row items-center ${InputStyle} pl-0`,
            shadowStyle(3)
          )}
        >
          <TextInput
            value={formattedDate}
            editable={false}
            pointerEvents='none'
            style={tw`border-0 h-full my-1`}
          />

          {date !== '' && <RelativeTime date={date} />}
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
