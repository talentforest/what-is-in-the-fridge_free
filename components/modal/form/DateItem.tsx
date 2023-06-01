import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { getDateKr, getISODate } from '../../../util';
import { useState } from 'react';
import { addDateBtns } from '../../../constant/addDateBtns';
import { INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import tw from 'twrnc';

interface Props {
  purchaseDate?: string;
  expiredDate: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function DateItem({
  purchaseDate,
  expiredDate,
  changeInfo,
}: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const date = purchaseDate || expiredDate;

  const toggleDatePicker = () => {
    setDatePickerVisibility((prev) => !prev);
  };

  const onConfirm = (date: Date) => {
    changeDate(date);
    toggleDatePicker();
  };

  const changeDate = (date: Date) => {
    if (expiredDate) {
      return changeInfo({ expiredDate: getISODate(date) });
    }
    return changeInfo({ purchaseDate: getISODate(date) });
  };

  return (
    <View>
      <View>
        <TextInput value={getDateKr(date)} editable={false} />
        <Icon
          name='calendar'
          size={18}
          color={INDIGO}
          style={tw`absolute p-2.5 pl-10 right-0 top-0.5`}
          onPress={toggleDatePicker}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={new Date(date)}
        onConfirm={onConfirm}
        onCancel={toggleDatePicker}
        minimumDate={expiredDate ? new Date() : undefined}
        maximumDate={purchaseDate ? new Date(expiredDate) : undefined}
      />

      <View style={tw`mt-2 flex-row gap-1 flex-wrap justify-end items-center`}>
        {addDateBtns.map((btn) => (
          <TouchableOpacity
            key={btn.label}
            onPress={() => changeDate(btn.func(new Date(date)))}
            style={tw`justify-center bg-${btn.btnColor}-300 border border-slate-400 p-0.5 px-2 rounded-2xl`}
          >
            <Text styletw='text-xs'>+ {btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
