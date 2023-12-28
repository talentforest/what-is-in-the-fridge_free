import { View } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { BLUE } from '../../constant/colors';
import { useState } from 'react';
import { Text, TouchableOpacity } from '../common/native-component';
import { useDispatch, useSelector } from '../../redux/hook';
import { setTime } from '../../redux/slice/notificationSlice';
import { getLocalDigitTime, setLocalTimeDate } from '../../util';
import tw from 'twrnc';

export default function TimeBtn() {
  const { time } = useSelector((state) => state.notification);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

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
        onPress={() => setTimePickerVisible((prev) => !prev)}
        style={tw`border border-slate-600 bg-white px-2.5 py-1 rounded-lg `}
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
          is24Hour
          themeVariant='light'
          positiveButton={{ textColor: BLUE }}
        />
      )}
    </View>
  );
}
