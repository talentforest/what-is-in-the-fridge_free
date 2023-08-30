import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_GRAY } from '../../../constant/colors';
import { ControlDateBtnType } from '../../../constant/controlDateBtns';

import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  btn: ControlDateBtnType;
  date: string;
  changeDate: (date: Date) => void;
}

export default function ControlDateBtn({ btn, changeDate, date }: Props) {
  return (
    <View
      key={btn.label}
      style={tw`h-7 rounded-md flex-row items-center justify-center bg-${btn.btnColor}-200 border border-${btn.btnColor}-600`}
    >
      <OperatorBtn
        btn={btn}
        changeDate={changeDate}
        date={date}
        operator='add'
      />
      <View
        style={tw`border-l border-r border-slate-600 px-1 h-full justify-center bg-${btn.btnColor}-100 border-${btn.btnColor}-600`}
      >
        <Text style={tw`text-stone-800 text-xs`}>{btn.label}</Text>
      </View>
      <OperatorBtn
        btn={btn}
        changeDate={changeDate}
        date={date}
        operator='minus'
      />
    </View>
  );
}

interface BtnProps {
  btn: ControlDateBtnType;
  date: string;
  changeDate: (date: Date) => void;
  operator: 'add' | 'minus';
}

function OperatorBtn({ changeDate, btn, date, operator }: BtnProps) {
  return (
    <TouchableOpacity
      onPress={() => changeDate(btn.calculateDate(operator, new Date(date)))}
      style={tw`px-2 h-full justify-center`}
    >
      <Icon
        name={operator === 'add' ? 'plus' : 'minus'}
        type='MaterialCommunityIcons'
        size={14}
        color={DEEP_GRAY}
      />
    </TouchableOpacity>
  );
}
