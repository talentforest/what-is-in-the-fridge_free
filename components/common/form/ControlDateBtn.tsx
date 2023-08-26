import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_GRAY } from '../../../constant/colors';
import { ControlDateBtnType } from '../../../constant/ControlDateBtns';
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
      style={tw`p-1 gap-1 rounded-full flex-row items-center justify-center bg-white border border-${btn.btnColor}-400`}
    >
      <OperatorBtn
        btn={btn}
        changeDate={changeDate}
        date={date}
        operator='add'
      />
      <Text style={tw`text-${btn.btnColor}-800`} fontSize={12}>
        {btn.label}
      </Text>
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
      style={tw`border border-${btn.btnColor}-500 bg-${btn.btnColor}-200 p-1 rounded-full`}
    >
      <Icon
        name={operator === 'add' ? 'plus' : 'minus'}
        type='MaterialCommunityIcons'
        size={13}
        color={DEEP_GRAY}
      />
    </TouchableOpacity>
  );
}
