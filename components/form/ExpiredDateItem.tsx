import { View } from 'react-native';
import { useState } from 'react';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { getDiffDate, getFormattedDate } from '../../util';
import { BLUE, LIGHT_BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { useDispatch, useSelector } from '../../redux/hook';
import { showExpiredDateModal } from '../../redux/slice/modalVisibleSlice';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useItemSlideAnimation } from '../../hooks';
import { Animated } from 'react-native';

import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import DateNumInputModal from '../../screen-component/modal/DateNumInputModal';
import RelativeTime from '../common/RelativeTime';
import RestoreDateBtn from '../buttons/RestoreDateBtn';
import tw from 'twrnc';

export default function ExpiredDateItem() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { datePickerViewing } = useSelector((state) => state.datePickerViewing);
  const { isExpiredItemClosed } = useSelector((state) => state.isFormItemOpen);
  const { expiredDateModal } = useSelector((state) => state.modalVisible);

  const {
    formFood: { expiredDate },
  } = useSelector((state) => state.formFood);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 84,
    active: !isExpiredItemClosed,
  });

  const dispatch = useDispatch();

  const changeDate = (newDate: Date | string) => {
    const expiredDate = newDate ? getFormattedDate(newDate, 'YYYY-MM-DD') : '';
    dispatch(editFormFood({ expiredDate }));
  };

  const onInputBoxPress = () => {
    if (datePickerViewing === '숫자로 날짜 입력') {
      dispatch(showExpiredDateModal(true));
    } else {
      setDatePickerVisible(true);
    }
  };

  const onDateChange = (event: DateTimePickerEvent) => {
    setDatePickerVisible(false);

    const { timestamp } = event.nativeEvent;
    if (timestamp) {
      changeDate(new Date(timestamp));
    }
  };

  return (
    <View>
      <FormLabel label='소비기한' />

      <Animated.View
        style={tw.style(`overflow-hidden -mx-1 px-1 -mt-1 pt-1`, { height })}
      >
        <View style={tw`flex-row items-center gap-1`}>
          <RestoreDateBtn changeDate={changeDate} />

          <TouchableOpacity
            onPress={onInputBoxPress}
            style={tw.style(`flex-1 flex-row items-center ${InputStyle} p-0`)}
          >
            <TextInput
              editable={false}
              value={getFormattedDate(expiredDate, 'YY.MM.DD')}
              style={tw`border-0 h-full bg-transparent pr-0.5`}
            />

            {getDiffDate(expiredDate) >= 0 && (
              <RelativeTime date={expiredDate} type='소비기한' />
            )}

            <View style={tw`absolute right-2`}>
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
          </TouchableOpacity>
        </View>

        <View style={tw`gap-1 pt-1.5 pb-1 flex-row flex-wrap items-start`}>
          {controlDateBtns.map((btn) => (
            <ControlDateBtn
              key={btn.label}
              btn={btn}
              changeDate={changeDate}
              date={expiredDate}
              type='add'
            />
          ))}
        </View>
      </Animated.View>

      {/* 날짜 숫자 입력 모달 */}
      {datePickerViewing === '숫자로 날짜 입력' && expiredDateModal && (
        <DateNumInputModal />
      )}

      {datePickerViewing === '달력으로 날짜 입력' && datePickerVisible && (
        <RNDateTimePicker
          value={new Date(expiredDate)}
          onChange={onDateChange}
          minimumDate={new Date()}
          display='spinner'
          mode='date'
          locale='ko_KO'
          themeVariant='light'
          positiveButton={{ textColor: BLUE }}
        />
      )}
    </View>
  );
}
