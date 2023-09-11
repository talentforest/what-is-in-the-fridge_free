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
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function ExpiredDateItem({ date, changeInfo }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const today = new Date();
  const expiredDate = date === '' ? today : new Date(date);
  const formattedDate = getFormattedDate(expiredDate, 'YYYY년 MM월 DD일');

  const onConfirm = (date: Date) => {
    setDatePickerVisible(false);
    changeDate(date);
  };

  const changeDate = (date: Date | string) => {
    return changeInfo({
      expiredDate: date === '' ? '' : getFormattedDate(date),
    });
  };

  return (
    <View>
      <View style={tw`mb-2`}>
        <FormLabel label='유통기한' />

        {/* 유통기한 */}

        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={tw`h-11 shadow-md border border-blue-300 bg-white rounded-lg flex-row items-center justify-between px-2`}
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
        <View style={tw`mt-2 gap-1 flex-row flex-wrap items-start`}>
          {controlDateBtns.map((btn) => (
            <ControlDateBtn
              key={btn.label}
              btn={btn}
              changeDate={changeDate}
              date={date}
            />
          ))}
        </View>
      </View>

      {/* 캘린더 픽커 모달 */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={expiredDate}
        onConfirm={onConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date()}
      />
    </View>
  );
}
