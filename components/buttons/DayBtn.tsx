import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { useDispatch, useSelector } from '../../redux/hook';
import { GRAY, INDIGO } from '../../constant/colors';
import { setApproachDate } from '../../redux/slice/notificationSlice';
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
  const { approachDate } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const changeDay = (day: number) => {
    dispatch(setApproachDate(day));
    setDayPickerVisible(false);
  };

  const toggleDayPickerVisible = () => setDayPickerVisible((prev) => !prev);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleDayPickerVisible}
        style={tw.style(
          `flex-row items-center gap-0.5 border border-slate-300 bg-white w-13.5 pl-2.5 pr-2 py-1 rounded-lg`,
          shadowStyle(3)
        )}
      >
        <Text fontSize={16} style={tw`text-slate-600`}>
          {`${approachDate}일`}
        </Text>
        <Icon name='triangle-down' type='Octicons' size={18} color={GRAY} />
      </TouchableOpacity>

      {dayPickerVisible && (
        <View
          style={tw`absolute top-7.5 border border-slate-300 bg-white items-center py-0.5 rounded-lg w-13.5`}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => changeDay(day)}
              style={tw`flex-row items-center justify-end gap-1 w-full px-2.5 py-2`}
            >
              {approachDate === day && (
                <Icon name='dot-fill' type='Octicons' size={9} color={INDIGO} />
              )}
              <Text
                fontSize={16}
                style={tw`${
                  approachDate === day ? 'text-indigo-600' : 'text-slate-600'
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
