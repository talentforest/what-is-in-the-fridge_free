import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { getISODate } from '../../../util';
import { useState } from 'react';
import { addDateBtns } from '../../../constant/addDateBtns';
import { INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

interface Props {
  expiredDate?: boolean;
  date: Date;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function DateItem({ expiredDate, date, changeInfo }: Props) {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleDateChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;

    changeDate(currentDate);
    return setOpenDatePicker(false);
  };

  const changeDate = (date: Date) => {
    return changeInfo(
      expiredDate
        ? { expiredDate: getISODate(date) }
        : { purchaseDate: getISODate(date) }
    );
  };

  return (
    <View>
      {openDatePicker ? (
        <DateTimePicker
          value={date}
          locale='ko'
          mode='date'
          display='default'
          onChange={handleDateChange}
          style={tw`mb-2`}
        />
      ) : (
        <View>
          <TextInput
            value={new Date(date).toLocaleDateString('ko')}
            editable={false}
            styletw='text-slate-700 h-10'
          />
          <TouchableOpacity
            onPress={() => setOpenDatePicker(true)}
            style={tw`absolute right-3 top-3 h-6`}
          >
            <Icon name='calendar' size={16} color={INDIGO} />
          </TouchableOpacity>
        </View>
      )}
      <View style={tw`mt-2 flex-row gap-1 flex-wrap justify-end items-center`}>
        {addDateBtns.map((btn) => (
          <TouchableOpacity
            key={btn.label}
            onPress={() => changeDate(btn.func(date))}
            style={tw`justify-center bg-${btn.btnColor}-300 border border-slate-400 p-0.5 px-2 rounded-2xl`}
          >
            <Text styletw='text-xs'>+ {btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
