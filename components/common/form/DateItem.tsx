import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { getFormattedDate, scaleH } from '../../../util';
import { useState } from 'react';
import { addDateBtns } from '../../../constant/addDateBtns';
import { INDIGO } from '../../../constant/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  expiredInfo?: boolean;
  date: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function DateItem({ expiredInfo, date, changeInfo }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const onConfirm = (date: Date) => {
    changeDate(date);
    setDatePickerVisible(false);
  };

  const changeDate = (date: Date) => {
    if (expiredInfo) {
      return changeInfo({ expiredDate: getFormattedDate(date) });
    }
    return changeInfo({ purchaseDate: getFormattedDate(date) });
  };

  return (
    <View>
      <View
        style={tw`h-[${scaleH(44)}px] 
        border border-slate-400 bg-white rounded-lg flex-row items-center justify-between px-2`}
      >
        <TextInput
          value={getFormattedDate(date, 'YYYY년 MM월 DD일')}
          editable={false}
          pointerEvents='none'
          style={tw`border-0 pl-0 my-0 py-0 text-slate-900`}
        />
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <Icon type='AntDesign' name='calendar' size={18} color={INDIGO} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode='date'
        locale='ko_KO'
        cancelTextIOS='취소'
        confirmTextIOS='확인'
        date={new Date(date)}
        onConfirm={onConfirm}
        onCancel={() => setDatePickerVisible(false)}
        textColor='#000'
        isDarkModeEnabled={false}
      />

      <View style={tw`mt-2 flex-row gap-1 flex-wrap items-center`}>
        {addDateBtns.map((btn) => (
          <TouchableOpacity
            key={btn.label}
            onPress={() => changeDate(btn.func(new Date(date)))}
            style={tw`justify-center bg-${btn.btnColor}-300 border border-slate-400 py-1 px-2 rounded-2xl`}
          >
            <Text fontSize={12}>+ {btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
