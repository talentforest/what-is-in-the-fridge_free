import { View } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { MEDIUM_GRAY } from '../../constant/colors';
import { useState } from 'react';
import { Text, TouchableOpacity } from '../common/native-component';
import { useDispatch, useSelector } from '../../redux/hook';
import { setTime } from '../../redux/slice/notificationSlice';
import { getLocalDigitTime, setLocalTimeDate } from '../../util';
import { shadowStyle } from '../../constant/shadowStyle';
import tw from 'twrnc';

export default function TimeBtn() {
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const { time } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const onChange = (event: DateTimePickerEvent) => {
    setTimePickerVisible(false);
    const { timestamp } = event.nativeEvent;
    const localDigitTime = getLocalDigitTime(new Date(timestamp));
    dispatch(setTime(localDigitTime));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setTimePickerVisible(true);
        }}
        style={tw.style(
          `border border-slate-300 bg-white px-2.5 py-1 rounded-lg`,
          shadowStyle(2)
        )}
      >
        <Text fontSize={16}>{time}</Text>
      </TouchableOpacity>

      {timePickerVisible && (
        <RNDateTimePicker
          value={setLocalTimeDate(time)}
          onChange={onChange}
          display='spinner'
          mode='time'
          locale='ko_KO'
          themeVariant='light'
          positiveButton={{ textColor: '#0000e6', label: '확인' }}
          negativeButton={{ textColor: MEDIUM_GRAY, label: '취소' }}
        />
      )}
    </View>
  );
}
