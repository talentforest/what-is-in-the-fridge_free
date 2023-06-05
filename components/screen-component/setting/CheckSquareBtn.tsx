import { Text, TouchableOpacity } from '../../native-component';
import { GRAY, INACTIVE_COLOR, INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { changeLocation } from '../../../redux/slice/fridgeInfoSlice';
import { useDispatch } from '../../../redux/hook';

interface Props {
  name: string;
  iconName?: string;
  check: boolean;
  disabled?: boolean;
}

export default function CheckSquareBtn({
  name,
  iconName,
  check,
  disabled,
}: Props) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() =>
        dispatch(
          changeLocation({
            freezer: name === '하단' ? 'bottom' : 'top',
          })
        )
      }
      style={tw`${
        check ? 'bg-amber-50 border-amber-500' : 'bg-white border-slate-300'
      } flex-1 flex-row items-center border px-2 py-3 rounded-md`}
    >
      <Icon
        name={
          check
            ? 'checkbox-marked-circle-outline'
            : 'checkbox-blank-circle-outline'
        }
        color={check ? INDIGO : INACTIVE_COLOR}
        size={18}
        style={tw`pr-2`}
      />
      {iconName && (
        <Icon
          name={iconName}
          color={check ? INDIGO : INACTIVE_COLOR}
          size={16}
        />
      )}
      <Text styletw={`${check ? 'text-indigo-500' : 'text-slate-400'} pl-1`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
