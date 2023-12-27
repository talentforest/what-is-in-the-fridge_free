import { Text, TouchableOpacity } from '../common/native-component';
import { ControlDateBtnType } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
import { Operator } from '../../util';
import { AMBER, GRAY, GREEN, INDIGO, RED } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: Operator;
  btn: ControlDateBtnType;
  date: string;
  changeDate: (newDate: Date | string) => void;
}

export default function ControlDateBtn({ type, btn, changeDate, date }: Props) {
  const btnColor =
    btn.btnColor === 'amber'
      ? AMBER
      : btn.btnColor === 'indigo'
      ? INDIGO
      : btn.btnColor === 'red'
      ? RED
      : btn.btnColor === 'teal'
      ? GREEN
      : '';

  return (
    <TouchableOpacity
      onPress={() => changeDate(btn.calculateDate(type, new Date(date)))}
      style={tw.style(
        `px-1.5 gap-0.5 h-7.5 rounded-3xl flex-row items-center justify-center 
        bg-${btn.btnColor}-50 border border-${btn.btnColor}-100`,
        shadowStyle(3)
      )}
    >
      {btn.label !== '오늘' && (
        <Icon
          name={type === 'add' ? 'plus' : 'dash'}
          type='Octicons'
          size={13}
          color={btnColor}
        />
      )}

      <Text fontSize={14} style={tw`pr-0.5 text-${btn.btnColor}-700`}>
        {btn.label}
      </Text>
    </TouchableOpacity>
  );
}
