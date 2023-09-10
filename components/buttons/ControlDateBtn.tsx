import { Text, TouchableOpacity } from '../common/native-component';
import { ControlDateBtnType } from '../../constant/controlDateBtns';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btn: ControlDateBtnType;
  date: string;
  changeDate: (date: Date, type: '유통기한') => void;
}

export default function ControlDateBtn({ btn, changeDate, date }: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        changeDate(btn.calculateDate('add', new Date(date)), '유통기한')
      }
      key={btn.label}
      style={tw`shadow-md h-9 px-3 gap-0.5 rounded-3xl flex-row items-center justify-center bg-${btn.btnColor}-50 border border-${btn.btnColor}-200`}
    >
      <Icon
        name='plus'
        type='MaterialCommunityIcons'
        size={18}
        color={btn.btnColor}
      />

      <Text style={tw`text-white text-${btn.btnColor}-700 text-sm`}>
        {btn.label}
      </Text>
    </TouchableOpacity>
  );
}
