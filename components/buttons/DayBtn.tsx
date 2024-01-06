import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { useDispatch, useSelector } from '../../redux/hook';
import { GRAY, INDIGO } from '../../constant/colors';
import { setExpiredSoonDay } from '../../redux/slice/notificationSlice';
import { shadowStyle } from '../../constant/shadowStyle';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  dayPickerVisible: boolean;
  setDayPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DayBtn({
  dayPickerVisible,
  setDayPickerVisible,
}: Props) {
  const { expiredSoonDay } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const changeDay = (day: number) => {
    dispatch(setExpiredSoonDay(day));
    setDayPickerVisible(false);
  };

  const toggleDayPickerVisible = () => setDayPickerVisible((prev) => !prev);

  return (
    <View>
      <View style={tw`gap-2`}>
        <TouchableOpacity
          onPress={toggleDayPickerVisible}
          style={tw.style(
            `flex-row items-center gap-0.5 border border-slate-300 bg-white w-15 pl-3.5 pr-5 py-1.5 rounded-lg`,
            shadowStyle(2)
          )}
        >
          <Text fontSize={16} style={tw`text-slate-600`}>
            {`${expiredSoonDay}일`}
          </Text>
          <Icon name='triangle-down' type='Octicons' size={18} color={GRAY} />
        </TouchableOpacity>

        <Text fontSize={15} style={tw`text-gray-400`}>
          {`소비기한이 ${expiredSoonDay}일 이하로 남은 식료품들을 알려드려요`}
        </Text>
      </View>

      {dayPickerVisible && (
        <View
          style={tw.style(
            `absolute top-9 border border-slate-300 bg-white flex-row items-center py-0.5 rounded-lg`,
            shadowStyle(2)
          )}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => changeDay(day)}
              style={tw`flex-row items-center justify-end gap-1 px-2.5 py-2`}
            >
              {expiredSoonDay === day && (
                <Icon name='dot-fill' type='Octicons' size={9} color={INDIGO} />
              )}
              <Text
                fontSize={16}
                style={tw`${
                  expiredSoonDay === day ? 'text-indigo-600' : 'text-slate-600'
                }`}
              >
                {day}일
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
