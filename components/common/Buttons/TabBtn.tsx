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
      style={tw`flex-row gap-1 items-center rounded-t-lg justify-between p-2.5 border-2 border-b-0 border-slate-300 ${
        active ? 'bg-amber-200' : 'bg-white'
      }`}
    >
      <Text
        style={tw`${active ? ' text-blue-700' : `text-[${INACTIVE_COLOR}]`}`}
        fontSize={14}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
