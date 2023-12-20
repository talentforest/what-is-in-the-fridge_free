import {
  TextInput as Input,
  TextInputProps,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import { LIGHT_GRAY } from '../../../constant/colors';
import { baseFontSize, basicTextStyle, getRelativeFontSize } from './Text';
import { useSelector } from '../../../redux/hook';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
  fontSize?: number;
}

export const InputStyle =
  'h-10 border border-slate-100 px-2.5 rounded-xl bg-white';

export function TextInput({ style, fontSize = baseFontSize, ...props }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);

  const { height } = useWindowDimensions();

  const relativeFontSize =
    height > 900
      ? getRelativeFontSize(fontFamily, fontSize) + 2
      : getRelativeFontSize(fontFamily, fontSize);

  return (
    <Input
      style={tw.style(`${InputStyle}`, {
        ...basicTextStyle,
        fontFamily,
        fontSize: relativeFontSize,
        ...style,
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
