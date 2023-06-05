import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../constant/colors';
import { Food } from '../../constant/foods';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  entireCheck: boolean;
  label: string;
  onEntirePress: (list: Food[]) => void;
  list: Food[];
}

export default function TableTotalItem({
  entireCheck,
  label,
  onEntirePress,
  list,
}: Props) {
  return (
    <View
      style={tw`px-4 border-t border-slate-300 flex-row items-center gap-2 h-12`}
    >
      <View style={tw`w-5 h-5 justify-center`}>
        <TouchableOpacity
          onPress={() => onEntirePress(list)}
          style={tw`w-5.5 h-5.5 justify-center`}
        >
          <Icon
            name={
              !entireCheck
                ? 'checkbox-blank-outline'
                : 'checkbox-marked-outline'
            }
            size={20}
            color={!entireCheck ? INACTIVE_COLOR : DEEP_INDIGO}
          />
        </TouchableOpacity>
      </View>
      <Text styletw='text-indigo-500 flex-1'>{label}</Text>
    </View>
  );
}
