import { View } from 'react-native';
import { scaleH } from '../../../util';
import { TextInput, TouchableOpacity } from '../../native-component';
import { GRAY, LIGHT_GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (keyword: string) => void;
  iconName: 'search' | 'plus';
  placeholder: string;
  onSubmitEditing: () => void;
}

export default function TextInputRoundedBox({
  value,
  setValue,
  iconName,
  placeholder,
  onSubmitEditing,
}: Props) {
  return (
    <View
      style={tw`h-[${scaleH(44)}px] 
      w-full mt-3 border-2 border-slate-300 rounded-full items-center flex-row bg-white
      pl-[${scaleH(10)}px] pr-[${scaleH(12)}px]`}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        returnKeyType='done'
        blurOnSubmit={false}
        style={tw`text-slate-600 flex-1 border-0 my-0.5`}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity onPress={onSubmitEditing}>
        <Icon
          type={iconName === 'search' ? 'Ionicons' : 'MaterialCommunityIcons'}
          name={iconName}
          size={22}
          color={value.length === 0 ? LIGHT_GRAY : GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}
