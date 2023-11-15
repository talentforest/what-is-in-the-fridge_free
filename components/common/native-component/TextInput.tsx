import {
  TextInput as Input,
  TextInputProps,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import { LIGHT_GRAY } from '../../../constant/colors';
import { baseFont, basicTextStyle, relativeSize } from './Text';
import { useSelector } from '../../../redux/hook';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
  fontSize?: number;
}

export const InputStyle =
  'h-10 border border-slate-200 px-2 rounded-xl bg-white';

export function TextInput({ style, fontSize = baseFont, ...props }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);

  const bigFont = fontFamily === 'NanumSquareRoundEB' || fontFamily === '';
  const letterSpacing =
    fontFamily === 'NanumSquareRoundEB' || fontFamily === '' ? 0 : 0.5;

  const { height } = useWindowDimensions();

  const relativeFontSizeByFont = bigFont ? fontSize - relativeSize : fontSize;
  const relativeFontSize =
    height > 900 ? relativeFontSizeByFont + 4 : relativeFontSizeByFont;

  const lineHeight = 24 + 2 * (fontSize - baseFont);
  const relativeLineHeight = height > 900 ? lineHeight + 4 * 2 : lineHeight;

  return (
    <Input
      style={tw.style(`${InputStyle}`, {
        ...basicTextStyle,
        fontSize: relativeFontSize + 1,
        letterSpacing,
        lineHeight: relativeLineHeight,
        fontFamily,
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
