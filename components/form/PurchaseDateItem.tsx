import { Animated, Keyboard, View } from 'react-native';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { BLUE } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { PlatformIOS } from '../../constant/statusBarHeight';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import tw from 'twrnc';
import DatePickerModal from '../../screen-component/modal/DatePickerModal';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function PurchaseDateItem({ date, changeInfo }: Props) {
  const formattedDate = getFormattedDate(
    date === '' ? new Date() : new Date(date),
    'YYYY년 MM월 DD일'
  );

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(formattedDate);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 49,
    active: purchaseOpen,
  });

  useEffect(() => {
    if (date !== '') {
      setPurchaseOpen(true);
    }
  }, []);

  const changeDate = (date: Date | '') => {
    const purchaseDate = date ? getFormattedDate(date, 'YYYY-MM-DD') : '';
    return changeInfo({ purchaseDate });
  };

  const onChange = (event: DateTimePickerEvent) => {
    if (!PlatformIOS) setDatePickerVisible(false);
    const timeStamp = event.nativeEvent.timestamp;

    if (timeStamp) {
      const purchaseDate = getFormattedDate(new Date(timeStamp), 'YYYY-MM-DD');
      if (!PlatformIOS) changeInfo({ purchaseDate });
      setPurchaseDate(purchaseDate);
    }
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
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setDatePickerVisible(true);
          }}
          style={tw.style(
            `h-11 mx-1 px-2 border border-slate-300 bg-white rounded-lg flex-row items-center justify-between`,
            shadowStyle(3)
          )}
        >
          <TextInput
            value={formattedDate}
            editable={false}
            pointerEvents='none'
            style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
          />
          <Icon type='AntDesign' name='calendar' size={16} color={BLUE} />
        </TouchableOpacity>
      </Animated.View>

      {/* 캘린더 픽커 모달 */}
      {datePickerVisible &&
        (PlatformIOS ? (
          <DatePickerModal
            isVisible={datePickerVisible}
            closeModal={() => setDatePickerVisible(false)}
            positivePress={() => changeInfo({ purchaseDate })}
          >
            <RNDateTimePicker
              value={new Date(date)}
              onChange={onChange}
              display='spinner'
              mode='date'
              locale='ko_KO'
              themeVariant='light'
              positiveButton={{ label: '확인', textColor: BLUE }}
            />
          </DatePickerModal>
        ) : (
          <RNDateTimePicker
            value={new Date(date)}
            onChange={onChange}
            display='spinner'
            mode='date'
            locale='ko_KO'
            themeVariant='light'
            positiveButton={{ label: '확인', textColor: BLUE }}
          />
        ))}
    </View>
  );
}
