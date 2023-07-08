import { useRoute } from '@react-navigation/native';
import { INDIGO, LIGHT_GRAY } from '../../../constant/colors';
import { Text, TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  setOpenTab: (btnName: string) => void;
  active: boolean;
  length: number;
  iconName?: 'fridge-off-outline' | 'fridge-outline';
}

export default function TabBtn({
  btnName,
  setOpenTab,
  active,
  length,
  iconName,
}: Props) {
  const route = useRoute();

  return (
    <TouchableOpacity
      key={btnName}
      onPress={() => setOpenTab(btnName)}
      style={tw`flex-row gap-1 items-center justify-between px-2 py-1 border-b-2 ${
        active ? 'border-indigo-400' : 'border-slate-200'
      }`}
    >
      {iconName && (
        <Icon
          name={iconName}
          type='MaterialCommunityIcons'
          size={17}
          color={active ? INDIGO : LIGHT_GRAY}
        />
      )}
      <Text
        style={tw`my-2 ${active ? ' text-indigo-600' : 'text-slate-400'}`}
        fontSize={14}
      >
        {btnName}
      </Text>
      {route.name === 'ExpiredFoods' && (
        <Text
          fontSize={12}
          style={tw`${
            !active
              ? 'text-slate-400'
              : length <= 2
              ? 'text-green-600'
              : length <= 8
              ? 'text-amber-600'
              : length > 8
              ? 'text-red-600'
              : 'text-slate-400'
          }`}
        >
          {length}개
        </Text>
      )}
    </TouchableOpacity>
  );
}
