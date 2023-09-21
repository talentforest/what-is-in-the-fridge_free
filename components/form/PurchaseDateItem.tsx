import { Animated, Keyboard, View } from 'react-native';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { BLUE } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function PurchaseDateItem({ date, changeInfo }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const today = new Date();
  const purchaseDate = date === '' ? today : new Date(date);
  const formattedDate = getFormattedDate(purchaseDate, 'YYYY년 MM월 DD일');

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

  const onConfirm = (date: Date) => {
    setDatePickerVisible(false);
    changeDate(date);
  };

  const changeDate = (date: Date | '') => {
    return changeInfo({
      purchaseDate: date ? getFormattedDate(date, 'YYYY-MM-DD') : '',
    });
  };

  const onPress = () => {
    Keyboard.dismiss();
    setPurchaseOpen((prev) => !prev);

    if (!purchaseOpen) {
      return changeDate(purchaseDate);
    }
    if (purchaseOpen) {
      return changeDate('');
    }
  };

  return (
    <View style={tw`-mb-1`}>
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
          marginBottom: -6,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setDatePickerVisible(true);
          }}
          style={tw`h-11 mx-1 shadow-md px-2 border border-slate-300 bg-white rounded-lg flex-row items-center justify-between`}
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
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={date === '' ? today : new Date(date)}
        onConfirm={onConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
}
