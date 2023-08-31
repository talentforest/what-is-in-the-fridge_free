import { View } from 'react-native';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useState } from 'react';
import { BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import tw from 'twrnc';

interface Props {
  expiredInfo?: boolean;
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function DateItem({ expiredInfo, date, changeInfo }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const onConfirm = (date: Date) => {
    setDatePickerVisible(false);
    changeDate(date);
  };

  const changeDate = (date: Date) => {
    return changeInfo(
      expiredInfo
        ? { expiredDate: getFormattedDate(date) }
        : { purchaseDate: getFormattedDate(date) }
    );
  };

  const formattedDate = getFormattedDate(date, 'YYYY년 MM월 DD일');

  return (
    <View>
      {/* 날짜 Input */}
      <FormLabel label={expiredInfo ? '유통기한' : '구매날짜'} />
      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={tw`h-12 border border-blue-600 bg-white rounded-lg flex-row items-center justify-between px-2`}
      >
        <TextInput
          value={formattedDate}
          editable={false}
          pointerEvents='none'
          style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
        />
        <Icon type='AntDesign' name='calendar' size={16} color={BLUE} />
      </TouchableOpacity>

      {/* 날짜 더하기 버튼들 */}
      <View style={tw`mt-1 flex-row gap-1.5 flex-wrap items-center`}>
        {controlDateBtns.map((btn) => (
          <ControlDateBtn
            key={btn.label}
            btn={btn}
            changeDate={changeDate}
            date={date}
          />
        ))}
      </View>

      {/* 캘린더 픽커 모달 */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={new Date(date)}
        onConfirm={onConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={expiredInfo ? new Date() : undefined}
      />
    </View>
  );
}
