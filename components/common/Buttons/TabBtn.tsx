import { INACTIVE_COLOR } from '../../../constant/colors';
import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  btnName: string;
  setOpenTab: (btnName: string) => void;
  active: boolean;
}

export default function TabBtn({ btnName, setOpenTab, active }: Props) {
  return (
    <TouchableOpacity
      key={btnName}
      onPress={() => setOpenTab(btnName)}
      style={tw`flex-row gap-1 items-center justify-between p-2.5 border-2 border-b-0  ${
        active ? 'bg-amber-200 border-amber-400' : 'bg-white border-slate-300'
      }`}
    >
      <Text
        style={tw`${active ? ' text-blue-700' : `text-[${INACTIVE_COLOR}]`}`}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
