import { View } from 'react-native';
import {
  InputStyle,
  Text,
  TextInput,
  TouchableOpacity,
} from '../components/common/native-component';
import { shadowStyle } from '../constant/shadowStyle';
import { formattedToday, getDiffDate, getFormattedDate } from '../util';
import { BLUE, LIGHT_BLUE } from '../constant/colors';

import { showExpiredDateModal } from '../redux/slice/modalVisibleSlice';
import { useDispatch, useSelector } from '../redux/hook';
import { useState } from 'react';
import {
  DatePickerViewing,
  changeDatePickerViewing,
} from '../redux/slice/datePickerViewingSlice';

import RelativeTime from '../components/common/RelativeTime';
import CheckBox from '../components/common/CheckBox';
import DateNumInputModal from '../screen-component/modal/DateNumInputModal';
import Container from '../components/common/Container';
import Icon from '../components/common/native-component/Icon';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

export default function SettingDatePicker() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { datePickerViewing } = useSelector((state) => state.datePickerViewing);

  const dispatch = useDispatch();

  const onItemPress = () => {
    if (datePickerViewing === '숫자로 날짜 입력') {
      dispatch(showExpiredDateModal(true));
    } else {
      setDatePickerVisible(true);
    }
  };

  const datePickers: DatePickerViewing[] = [
    '숫자로 날짜 입력',
    '달력으로 날짜 입력',
  ];

  return (
    <Container>
      <View style={tw`mt-2 px-2`}>
        <View style={tw`w-full gap-1`}>
          <Text fontSize={16} style={tw`text-slate-500 mt-0.5`}>
            입력 방식 선택하기
          </Text>
          <View
            style={tw.style(
              `border border-slate-100 bg-white rounded-xl p-2.5 gap-2.5`,
              shadowStyle(3)
            )}
          >
            {datePickers.map((picker) => (
              <TouchableOpacity
                key={picker}
                onPress={() => dispatch(changeDatePickerViewing(picker))}
                style={tw`py-0.5 flex-row items-center gap-1`}
              >
                <CheckBox checked={datePickerViewing === picker} size={14} />

                <Text>{picker}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tw`w-full mt-8 gap-1`}>
          <Text fontSize={16} style={tw`text-slate-500 mt-0.5`}>
            선택한 입력 방식 테스트
          </Text>

          <TouchableOpacity
            onPress={onItemPress}
            style={tw.style(
              `flex-row items-center ${InputStyle} p-0`,
              shadowStyle(3)
            )}
          >
            <View style={tw`pl-2.5`}>
              <Icon
                name={
                  datePickerViewing === '숫자로 날짜 입력'
                    ? 'pencil'
                    : 'calendar'
                }
                type='Octicons'
                size={14}
                color={LIGHT_BLUE}
              />
            </View>

            <TextInput
              editable={false}
              value={getFormattedDate(formattedToday, 'YY.MM.DD')}
              style={tw`border-0 h-full bg-transparent pr-2`}
            />

            {getDiffDate(formattedToday) >= 0 && (
              <RelativeTime date={formattedToday} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <DateNumInputModal />

      {datePickerVisible && (
        <RNDateTimePicker
          value={new Date(formattedToday)}
          onChange={() => {
            setDatePickerVisible(false);
          }}
          minimumDate={new Date()}
          display='spinner'
          mode='date'
          locale='ko_KO'
          themeVariant='light'
          positiveButton={{ label: '확인', textColor: BLUE }}
        />
      )}
    </Container>
  );
}
