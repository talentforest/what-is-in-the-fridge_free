import { Animated, View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { useEffect, useState } from 'react';
import { BLUE, GRAY, LIGHT_GRAY } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '../common/native-component/Icon';
import FormLabel from './FormLabel';
import MessageBox from '../common/MessageBox';
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
    toValue: 52,
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
    return changeInfo({ purchaseDate: date ? getFormattedDate(date) : '' });
  };

  const onPress = () => {
    setPurchaseOpen((prev) => !prev);

    if (!purchaseOpen) {
      return changeDate(purchaseDate);
    }
    if (purchaseOpen) {
      return changeDate('');
    }
  };

  return (
    <View>
      <View style={tw`mb-1`}>
        <View style={tw`flex-row items-center gap-1 justify-between`}>
          <FormLabel label='구매날짜' />
          <TouchableOpacity
            onPress={onPress}
            style={tw`flex-row items-center gap-1`}
          >
            <Icon
              name={purchaseOpen ? 'chevron-up' : 'add'}
              type='Ionicons'
              size={20}
              color={purchaseOpen ? LIGHT_GRAY : GRAY}
            />
            <Text
              style={tw`text-sm ${
                purchaseOpen ? 'text-slate-500' : 'text-slate-800'
              }`}
            >
              {purchaseOpen ? '생략하기' : '추가하기'}
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            height,
            overflow: 'hidden',
            marginHorizontal: -4,
          }}
        >
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={tw`h-11 mx-1 shadow-md px-2 border border-blue-300 bg-white rounded-lg flex-row items-center justify-between`}
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
      </View>

      <View
        style={tw`${!purchaseOpen ? 'border-t border-slate-300 pt-1' : ''}`}
      >
        <MessageBox message='유통기한이 없는 식료품(예: 신선식품류)인 경우 추가 정보로 작성할 수 있어요' />
      </View>

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
