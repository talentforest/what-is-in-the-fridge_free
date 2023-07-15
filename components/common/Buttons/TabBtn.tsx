import { useRoute } from '@react-navigation/native';
import { BLUE, INACTIVE_COLOR } from '../../../constant/colors';
import { Text, TouchableOpacity } from '../../native-component';
import { getColorByFoodLength } from '../../../constant/caution';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  setOpenTab: (btnName: string) => void;
  active: boolean;
  length?: number;
  iconName?: 'fridge-off' | 'fridge';
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
      style={tw`flex-row gap-1 items-center rounded-t-lg justify-between px-2 py-2 border-2 border-b-0 border-slate-300 ${
        active ? 'bg-amber-200' : 'bg-white'
      }`}
    >
      {iconName && (
        <Icon
          name={iconName}
          type='MaterialCommunityIcons'
          size={16}
          color={active ? BLUE : INACTIVE_COLOR}
        />
      )}
      <Text
        style={tw`${active ? ' text-blue-700' : `text-[${INACTIVE_COLOR}]`}`}
        fontSize={14}
      >
        {btnName}
      </Text>
      {route.name === 'ExpiredFoods' && (
        <Text
          fontSize={12}
          style={tw`${
            active
              ? getColorByFoodLength(length || 0)
              : `text-[${INACTIVE_COLOR}]`
          }`}
        >
          {length}개
        </Text>
      )}
    </TouchableOpacity>
  );
}
