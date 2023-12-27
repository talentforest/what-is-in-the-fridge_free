import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { Animated, View } from 'react-native';
import {
  InputStyle,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { closeKeyboard, getDiffDate, getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { minusControlDateBtns } from '../../constant/controlDateBtns';
import { BLUE, LIGHT_BLUE } from '../../constant/colors';
import { togglePurchaseItemOpen } from '../../redux/slice/food/isMemoOpenSlice';
import { showPurchaseDateModal } from '../../redux/slice/modalVisibleSlice';

import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import ChevronToggleBtn from '../buttons/ChevronToggleBtn';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import RestoreDateBtn from '../buttons/RestoreDateBtn';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import DateNumInputModal from '../../screen-component/modal/DateNumInputModal';
import RelativeTime from '../common/RelativeTime';

export default function PurchaseDateItem() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { datePickerViewing } = useSelector((state) => state.datePickerViewing);
  const {
    formFood: { purchaseDate },
  } = useSelector((state) => state.formFood);
  const { isPurchaseItemOpen } = useSelector((state) => state.isFormItemOpen);
  const { purchaseDateModal } = useSelector((state) => state.modalVisible);

  const dispatch = useDispatch();

  const setDate = purchaseDate === '' ? new Date() : new Date(purchaseDate);

  const formattedDate = getFormattedDate(setDate, 'YY.MM.DD');

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 82,
    active: isPurchaseItemOpen,
  });

  useEffect(() => {
    if (purchaseDate !== '') {
      dispatch(togglePurchaseItemOpen(true));
    } else {
      dispatch(togglePurchaseItemOpen(false));
    }
  }, []);

  const changeDate = (date: Date | string) => {
    const purchaseDate = date ? getFormattedDate(date, 'YYYY-MM-DD') : '';
    return dispatch(editFormFood({ purchaseDate }));
  };

  const onPress = () => {
    closeKeyboard();
    dispatch(togglePurchaseItemOpen(!isPurchaseItemOpen));
    changeDate(!isPurchaseItemOpen ? new Date() : '');
  };

  const onDateChange = (event: DateTimePickerEvent) => {
    setDatePickerVisible(false);

    const { timestamp } = event.nativeEvent;
    if (timestamp) {
      changeDate(new Date(timestamp));
    }
  };

  const onInputBoxPress = () => {
    if (datePickerViewing === '숫자로 날짜 입력') {
      dispatch(showPurchaseDateModal(true));
    } else {
      setDatePickerVisible(true);
    }
  };

  return (
    <View style={tw`flex-1`}>
      <FormLabel label='구매날짜'>
        <ChevronToggleBtn onPress={onPress} isOpen={isPurchaseItemOpen} />
      </FormLabel>

      <Animated.View style={tw.style(`overflow-hidden -mx-1 px-1`, { height })}>
        <View style={tw`flex-row items-center gap-1`}>
          <RestoreDateBtn changeDate={changeDate} />

          <TouchableOpacity
            onPress={onInputBoxPress}
            style={tw.style(
              `flex-1 flex-row items-center ${InputStyle} p-0`,
              shadowStyle(3)
            )}
          >
            <TextInput
              editable={false}
              value={formattedDate}
              style={tw`border-0 h-full bg-transparent pr-0.5`}
            />

            {getDiffDate(purchaseDate) <= 0 && (
              <RelativeTime date={purchaseDate} type='구매날짜' />
            )}
          </TouchableOpacity>

          <View style={tw`absolute right-2`}>
            <Icon
              name={
                datePickerViewing === '숫자로 날짜 입력' ? 'pencil' : 'calendar'
              }
              type='Octicons'
              size={14}
              color={LIGHT_BLUE}
            />
          </View>
        </View>

        <View style={tw`mt-1.5 gap-1 flex-row flex-wrap items-start`}>
          {minusControlDateBtns.map((btn) => (
            <ControlDateBtn
              key={btn.label}
              type='minus'
              btn={btn}
              changeDate={changeDate}
              date={purchaseDate}
            />
          ))}
        </View>
      </Animated.View>

      {/* 날짜 숫자 입력 모달 */}
      {datePickerViewing === '숫자로 날짜 입력' && purchaseDateModal && (
        <DateNumInputModal />
      )}

      {datePickerViewing === '달력으로 날짜 입력' && datePickerVisible && (
        <RNDateTimePicker
          value={new Date(purchaseDate)}
          onChange={onDateChange}
          maximumDate={new Date()}
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
