import {
  TextInput as Input,
  Platform,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import { LIGHT_GRAY } from '../../constant/colors';
import { responsiveFontSize, scaleH } from '../../util';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
}

export function TextInput({ style, ...props }: Props) {
  return (
    <Input
      style={tw.style(
        `h-[${scaleH(40)}px] 
            border border-slate-400 p-2 rounded-lg bg-white 
            text-[${responsiveFontSize(14)}px]`,
        FontGmarketSansRegular,
        style
      )}
      placeholderTextColor={LIGHT_GRAY}
      allowFontScaling={false}
      {...props}
    />
  );
}
