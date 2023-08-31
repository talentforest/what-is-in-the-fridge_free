import { TextInput as Input, TextInputProps, TextStyle } from 'react-native';
import { FontGmarketSansRegular } from '../../../constant/fonts';
import { LIGHT_GRAY } from '../../../constant/colors';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
}

export function TextInput({ style, ...props }: Props) {
  return (
    <Input
      style={tw.style(
        `text-[15px] h-10 border border-slate-400 p-2 rounded-lg bg-white`,
        FontGmarketSansRegular,
        style
      )}
      placeholderTextColor={LIGHT_GRAY}
      allowFontScaling={false}
      returnKeyType='done'
      returnKeyLabel='완료'
      {...props}
    />
  );
}
