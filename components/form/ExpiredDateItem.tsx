import { View } from 'react-native';
import { useEffect, useState } from 'react';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { getDiffDate, getFormattedDate } from '../../util';
import { BLUE, DEEP_GRAY, LIGHT_BLUE } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
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
import CheckBoxItem from '../common/CheckBoxItem';
import tw from 'twrnc';
import { toggleExpiredItemClosed } from '../../redux/slice/food/isMemoOpenSlice';

export default function ExpiredDateItem() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { datePickerViewing } = useSelector((state) => state.datePickerViewing);
  const { isExpiredItemClosed } = useSelector((state) => state.isFormItemOpen);

  const {
    formFood: { expiredDate },
  } = useSelector((state) => state.formFood);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 82,
    active: !isExpiredItemClosed,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (expiredDate === '') {
      dispatch(toggleExpiredItemClosed(true));
    }
  }, []);

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

  const toggleExpiredItemOpen = () => {
    changeDate(isExpiredItemClosed ? new Date() : '');
    dispatch(toggleExpiredItemClosed(!isExpiredItemClosed));
  };

  return (
    <View>
      <FormLabel label='소비기한'>
        <CheckBoxItem
          onPress={toggleExpiredItemOpen}
          checked={isExpiredItemClosed}
          title='소비기한이 중요하지 않아요'
          activeColor={DEEP_GRAY}
          size={15}
        />
      </FormLabel>

      <Animated.View style={{ height, overflow: 'hidden' }}>
        <TouchableOpacity
          onPress={onInputBoxPress}
          style={tw.style(
            `flex-row items-center ${InputStyle} p-0`,
            shadowStyle(3)
          )}
        >
          {expiredDate && (
            <>
              <TextInput
                editable={false}
                value={getFormattedDate(expiredDate, 'YY.MM.DD')}
                style={tw`border-0 h-full bg-transparent pr-0.5`}
              />

              {getDiffDate(expiredDate) >= 0 && (
                <RelativeTime date={expiredDate} />
              )}
            </>
          )}

          <View style={tw`absolute right-2`}>
            <Icon name='pencil' type='Octicons' size={14} color={LIGHT_BLUE} />
          </View>
        </TouchableOpacity>

        <View style={tw`mt-1.5 gap-1 flex-row flex-wrap items-start`}>
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
      {datePickerViewing === '숫자로 날짜 입력' && <DateNumInputModal />}

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
