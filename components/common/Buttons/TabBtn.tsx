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
      style={tw`flex-row gap-1 items-center justify-between px-1.5 pb-1 pt-0 border-b-2 ${
        active ? 'border-blue-500' : 'border-slate-300'
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
        style={tw`my-2 ${
          active ? ' text-blue-700' : `text-[${INACTIVE_COLOR}]`
        }`}
        fontSize={14}
      >
        {btnName}
      </Text>
      {route.name === 'ExpiredFoods' && length && (
        <Text
          fontSize={12}
          style={tw`${
            active ? getColorByFoodLength(length) : `text-[${INACTIVE_COLOR}]`
          }`}
        >
          {length}개
        </Text>
      )}
    </TouchableOpacity>
  );
}
