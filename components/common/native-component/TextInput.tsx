import { TextInput as Input, TextInputProps, TextStyle } from 'react-native';
import { HSSaemaulRegular } from '../../../constant/fonts';
import { LIGHT_GRAY } from '../../../constant/colors';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
}

export const InputStyle =
  'text-lg h-10 border border-slate-200 px-3 rounded-xl bg-white text-slate-900';

export function TextInput({ style, editable, ...props }: Props) {
  return (
    <Input
      style={tw.style(`${InputStyle}`, HSSaemaulRegular, style, {
        lineHeight: 18,
      })}
      numberOfLines={1}
      placeholderTextColor={LIGHT_GRAY}
      allowFontScaling={false}
      returnKeyType='done'
      returnKeyLabel='완료'
      {...props}
    />
  );
}
