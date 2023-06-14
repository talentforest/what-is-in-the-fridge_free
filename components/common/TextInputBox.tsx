import { View } from 'react-native';
import { scaleH } from '../../util';
import { TextInput, TouchableOpacity } from '../native-component';
import { LIGHT_GRAY } from '../../constant/colors';
import Icon from '../native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (keyword: string) => void;
  iconName: 'search1' | 'plus';
  placeholder: string;
  onSubmitEditing: () => void;
}

export default function TextInputBox({
  value,
  setValue,
  iconName,
  placeholder,
  onSubmitEditing,
}: Props) {
  return (
    <View
      style={tw`w-full border h-[${scaleH(11)}] pl-[${scaleH(10)}] pr-[${scaleH(
        12
      )}] my-3 border-slate-400 rounded-full items-center  flex-row bg-white`}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        returnKeyType='done'
        blurOnSubmit={false}
        style={tw`text-slate-600 flex-1 rounded-full border-0`}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity onPress={onSubmitEditing}>
        <Icon type='AntDesign' name={iconName} size={22} color={LIGHT_GRAY} />
      </TouchableOpacity>
    </View>
  );
}
