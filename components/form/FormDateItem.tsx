import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../native-component';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { getISODate } from '../../util';
import { useState } from 'react';
import { addDateBtns } from '../../constant/addDateBtns';
import { INDIGO } from '../../constant/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

interface Props {
  label: string;
  date: Date;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormDateItem({ label, date, changeFoodInfo }: Props) {
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
    if (label === '식료품 유통기한')
      return changeFoodInfo({ expirationDate: getISODate(date) });
    if (label === '식료품 구매날짜')
      return changeFoodInfo({ purchaseDate: getISODate(date) });
  };

  return (
    <>
      <View
        style={tw`bg-white gap-1 p-2 rounded-lg border-2 border-indigo-500`}
      >
        <Text styletw='mb-2 text-xs text-indigo-500'>{label}</Text>
        <View style={tw`justify-between gap-2`}>
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
                  styletw='text-slate-700'
                  onPressOut={() => setOpenDatePicker(true)}
                />
                <TouchableOpacity
                  onPress={() => setOpenDatePicker(true)}
                  style={tw`absolute right-2 top-2 bottom-0 h-6`}
                >
                  <Icon name='calendar' size={16} color={INDIGO} />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={tw`mt-2 flex-row gap-1 flex-wrap justify-end items-center`}
            >
              {addDateBtns.map((btn) => (
                <TouchableOpacity
                  key={btn.label}
                  onPress={() => changeDate(btn.func(date))}
                  style={tw`justify-center bg-${btn.btnColor}-300 border border-slate-400 p-1 px-2 rounded-2xl`}
                >
                  <Text styletw='text-xs'>+ {btn.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
