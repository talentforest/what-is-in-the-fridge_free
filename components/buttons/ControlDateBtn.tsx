import { Text, TouchableOpacity } from '../common/native-component';
import { ControlDateBtnType } from '../../constant/controlDateBtns';
import { shadowStyle } from '../../constant/shadowStyle';
import { Operator, formattedToday } from '../../util';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import { GRAY } from '../../constant/colors';

interface Props {
  type: Operator;
  btn: ControlDateBtnType;
  date: string;
  changeDate: (newDate: Date | string) => void;
}

export default function ControlDateBtn({ type, btn, changeDate, date }: Props) {
  return (
    <TouchableOpacity
      onPress={() => changeDate(btn.calculateDate(type, new Date(date)))}
      style={tw.style(
        `pl-3 pr-2 h-9 rounded-3xl flex-row items-center justify-center 
        bg-${btn.btnColor}-50  border border-${btn.btnColor}-200`,
        shadowStyle(3)
      )}
    >
      <Text
        style={tw`-mx-0.5 ${
          btn.label === '오늘' ? 'pr-1' : ''
        } text-white text-${btn.btnColor}-700 text-[13px]`}
      >
        {btn.label}
      </Text>

      {btn.label === '오늘' && (
        <Icon name='rotate-ccw' type='Feather' size={13} color={GRAY} />
      )}

      {btn.label !== '오늘' && (
        <Icon
          name={type === 'add' ? 'plus' : 'minus'}
          type='Feather'
          size={16}
          color={btn.btnColor}
        />
      )}
    </TouchableOpacity>
  );
}
