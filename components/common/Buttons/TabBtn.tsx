import { INACTIVE_COLOR } from '../../../constant/colors';
import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  btnName: string;
  setOpenTab: (btnName: string) => void;
  active: boolean;
}

export default function TabBtn({ btnName, setOpenTab, active }: Props) {
  const btnStyle = active
    ? 'bg-amber-200 border-amber-400'
    : 'bg-white border-slate-300';

  const textColor = active ? ' text-blue-700' : `text-[${INACTIVE_COLOR}]`;

  return (
    <TouchableOpacity
      key={btnName}
      onPress={() => setOpenTab(btnName)}
      style={tw`${btnStyle} flex-row gap-1 ios:rounded-t-lg items-center justify-between p-2 border-2 border-b-0`}
    >
      <Text style={tw`${textColor}`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
