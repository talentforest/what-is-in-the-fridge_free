import { Text, TouchableOpacity } from '../../native-component';
import {
  GRAY,
  INACTIVE_COLOR,
  INDIGO,
  LIGHT_INDIGO,
} from '../../../constant/colors';
import { changeLocation } from '../../../redux/slice/fridgeInfoSlice';
import { useDispatch } from '../../../redux/hook';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { scaleH } from '../../../util';

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
        check ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-slate-300'
      } flex-1 flex-row items-center border px-2 rounded-md h-[${scaleH(11)}]`}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={
          check
            ? 'checkbox-marked-circle-outline'
            : 'checkbox-blank-circle-outline'
        }
        color={check ? INDIGO : INACTIVE_COLOR}
        size={18}
      />
      {iconName && (
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          color={check ? GRAY : INACTIVE_COLOR}
          size={16}
        />
      )}
      <Text style={tw`${check ? 'text-slate-600' : 'text-slate-400'} pl-1`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
