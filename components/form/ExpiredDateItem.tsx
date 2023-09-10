import { Animated, View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { BLUE, GRAY, LIGHT_GRAY } from '../../constant/colors';
import { controlDateBtns } from '../../constant/controlDateBtns';
import { useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

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
  const [dateOpen, setDateOpen] = useState(false);

  const route = useRoute();
  const routePantryFoods = route.name === 'PantryFoods';

  const today = new Date();
  const expiredDate = date === '' ? today : new Date(date);
  const formattedDate = getFormattedDate(expiredDate, 'YYYY년 MM월 DD일');

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: routePantryFoods ? 140 : 98,
    active: dateOpen,
  });

  useEffect(() => {
    if (!routePantryFoods) {
      setDateOpen(true);
    }
  }, []);

  const onConfirm = (date: Date) => {
    setDatePickerVisible(false);
    changeDate(date);
  };

  const changeDate = (date: Date | string) => {
    return changeInfo({
      expiredDate: date === '' ? '' : getFormattedDate(date),
    });
  };

  const onPress = () => {
    setDateOpen((prev) => !prev);

    if (!dateOpen) {
      return changeDate(expiredDate);
    }
    if (dateOpen) {
      return changeDate('');
    }
  };

  return (
    <View style={tw``}>
      <View style={tw`mb-2`}>
        <View style={tw`flex-row items-center justify-between gap-1 `}>
          <FormLabel label='유통기한' />

          {routePantryFoods && (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-1`}
            >
              <Icon
                name={dateOpen ? 'chevron-up' : 'add'}
                type='Ionicons'
                size={20}
                color={dateOpen ? LIGHT_GRAY : GRAY}
              />
              <Text
                style={tw`text-sm ${
                  dateOpen ? 'text-slate-500' : 'text-slate-800'
                }`}
              >
                {dateOpen ? '생략하기' : '추가하기'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 유통기한 */}
        <Animated.View style={{ height, overflow: 'hidden' }}>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={tw`h-12 border border-blue-300 bg-white rounded-lg flex-row items-center justify-between px-2`}
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
        </Animated.View>
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
