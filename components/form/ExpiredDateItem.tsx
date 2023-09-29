import { View } from 'react-native';
import { TextInput, TouchableOpacity } from '../common/native-component';
import { getDiffDate, getFormattedDate, getRelativeTime } from '../../util';
import { useState } from 'react';
import { BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { PlatformIOS } from '../../constant/statusBarHeight';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import MessageBox from '../common/MessageBox';
import DatePickerModal from '../modal/DatePickerModal';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function ExpiredDateItem({ date, changeInfo }: Props) {
  const formattedDate = getFormattedDate(new Date(date), 'YYYY-MM-DD');

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [expiredDate, setExpiredDate] = useState(formattedDate);

  const changeDate = (date: Date | string) => {
    const expiredDate = getFormattedDate(date, 'YYYY-MM-DD');
    return changeInfo({ expiredDate });
  };

  const onChange = (event: DateTimePickerEvent) => {
    const { timestamp } = event.nativeEvent;

    if (timestamp) {
      const selectedDate = getFormattedDate(new Date(timestamp), 'YYYY-MM-DD');
      setExpiredDate(selectedDate);
    }

    setDatePickerVisible(false);
  };

  return (
    <View>
      <View style={tw`mb-5`}>
        <FormLabel label='유통기한' />

        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={tw.style(
            `h-11 border border-slate-300 bg-white rounded-lg flex-row items-center justify-between px-2`,
            shadowStyle(3)
          )}
        >
          <TextInput
            value={getFormattedDate(date, 'YYYY년 MM월 DD일')}
            editable={false}
            pointerEvents='none'
            style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
          />
          <Icon type='AntDesign' name='calendar' size={16} color={BLUE} />
        </TouchableOpacity>

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

      {getDiffDate(date) > 0 && (
        <MessageBox
          color='green'
          message={`오늘${
            getRelativeTime(expiredDate) === '오늘'
              ? '까지'
              : `로부터 ${getRelativeTime(expiredDate)}까지`
          } 섭취할 수 있습니다.`}
        />
      )}

      {/* 캘린더 픽커 모달 */}
      {datePickerVisible &&
        (PlatformIOS ? (
          <DatePickerModal
            isVisible={datePickerVisible}
            closeModal={() => setDatePickerVisible(false)}
            changeInfo={() => changeInfo({ expiredDate })}
          >
            <RNDateTimePicker
              value={new Date(date)}
              onChange={onChange}
              minimumDate={new Date()}
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
            minimumDate={new Date()}
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
