import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { addDay, addMonth, addWeek, addYear, getISODate } from '../../util';
import tw from 'twrnc';
import { FormLabel } from '../modal/AddFoodModal';

interface Props {
  label: FormLabel;
  date: Date;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

const addDateBtns = [
  { label: '하루', func: addDay, color: 'bg-yellow-300' },
  { label: '일주일', func: addWeek, color: 'bg-teal-300' },
  { label: '한달', func: addMonth, color: 'bg-red-300' },
  { label: '일년', func: addYear, color: 'bg-indigo-300' },
];

export default function FormDateItem({ label, date, changeFoodInfo }: Props) {
  const handleDateChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    if (label === '식료품 유통기한')
      return changeFoodInfo({ expirationDate: getISODate(currentDate) });
    if (label === '식료품 구매날짜')
      return changeFoodInfo({
        purchaseDate: getISODate(currentDate),
      });
  };

  return (
    <View
      style={tw`bg-indigo-50 gap-1 flex-1 border p-2 rounded-lg border-slate-400`}
    >
      <Text styletw='mb-2 text-indigo-500'>{label}</Text>
      <View style={tw`justify-between gap-2`}>
        <DateTimePicker
          value={date}
          locale='ko'
          mode='date'
          onChange={handleDateChange}
        />
        <View style={tw`flex-row gap-1 flex-wrap justify-end`}>
          {addDateBtns.map((btn) => (
            <TouchableOpacity
              key={btn.label}
              onPress={() => {
                if (label === '식료품 유통기한')
                  return changeFoodInfo({
                    expirationDate: getISODate(new Date(btn.func(date))),
                  });
                if (label === '식료품 구매날짜')
                  return changeFoodInfo({
                    purchaseDate: getISODate(new Date(btn.func(date))),
                  });
              }}
              style={tw`justify-center ${btn.color} border border-slate-400 p-1.5 rounded-2xl`}
            >
              <Text styletw='text-[11px]'>+ {btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
