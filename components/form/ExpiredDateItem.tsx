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
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleExpiredDateModal } from '../../redux/slice/formModalSlice';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import MessageBox from '../common/MessageBox';
import DatePickerModal from '../../screen-component/modal/DatePickerModal';
import DateNumInputModal from '../../screen-component/modal/DateNumInputModal';
import tw from 'twrnc';

interface Props {
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function ExpiredDateItem({ date, changeInfo }: Props) {
  const formattedDate = getFormattedDate(new Date(date), 'YYYY-MM-DD');

  const { expiredDateModal } = useSelector((state) => state.formModalVisible);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [expiredDate, setExpiredDate] = useState(formattedDate);

  const dispatch = useDispatch();

  const changeDate = (date: Date | string) => {
    const expiredDate = getFormattedDate(date, 'YYYY-MM-DD');
    return changeInfo({ expiredDate });
  };

  const onChange = (event: DateTimePickerEvent) => {
    if (!PlatformIOS) setDatePickerVisible(false);
    const { timestamp } = event.nativeEvent;

    if (timestamp) {
      const expiredDate = getFormattedDate(new Date(timestamp), 'YYYY-MM-DD');
      if (!PlatformIOS) changeInfo({ expiredDate });
      return setExpiredDate(expiredDate);
    }
  };

  return (
    <View>
      <View style={tw`mb-5`}>
        <FormLabel label='소비기한' />

        <TouchableOpacity
          onPress={() => dispatch(toggleExpiredDateModal(true))}
          style={tw.style(
            `h-11 border border-slate-300 bg-white rounded-lg flex-row items-center justify-between px-2`,
            shadowStyle(3)
          )}
        >
          <TextInput
            value={getFormattedDate(date, 'YY년 MM월 DD일')}
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

      {getDiffDate(date) >= 0 && (
        <MessageBox
          color='gray'
          message={`${
            getRelativeTime(date) === '오늘'
              ? '오늘까지'
              : `${getRelativeTime(date)}까지`
          } 섭취할 수 있습니다.`}
        />
      )}

      {/* 날짜 숫자 입력 모달 */}
      {expiredDateModal && (
        <DateNumInputModal
          isVisible={expiredDateModal}
          closeModal={() => dispatch(toggleExpiredDateModal(false))}
          expiredDate={expiredDate}
          changeInfo={changeInfo}
        />
      )}

      {/* 캘린더 픽커 모달 */}
      {datePickerVisible &&
        (PlatformIOS ? (
          <DatePickerModal
            isVisible={datePickerVisible}
            closeModal={() => setDatePickerVisible(false)}
            positivePress={() => changeInfo({ expiredDate })}
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
