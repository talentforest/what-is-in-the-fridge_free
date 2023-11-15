import {
  Text as RNText,
  TextProps,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import { useSelector } from '../../../redux/hook';

interface Props extends TextProps {
  style?: TextStyle;
  fontSize?: number;
}

export const basicTextStyle = {
  color: '#333',
};

export const relativeSize = 3;

export const baseFont = 17;

export function Text({ style, fontSize = baseFont, ...props }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);

  const bigFont = fontFamily === 'NanumSquareRoundEB' || fontFamily === '';
  const letterSpacing =
    fontFamily === 'NanumSquareRoundEB' || fontFamily === '' ? 0 : 0.5;

  const { height } = useWindowDimensions();

  const relativeFontSizeByFont = bigFont ? fontSize - relativeSize : fontSize;
  const relativeFontSize =
    height > 900 ? relativeFontSizeByFont + 2 : relativeFontSizeByFont;

  const lineHeight = 24 + 2 * (fontSize - baseFont);
  const relativeLineHeight = height > 900 ? lineHeight + 2 * 2 : lineHeight;

  return (
    <RNText
      allowFontScaling={false}
      style={{
        ...basicTextStyle,
        lineHeight: relativeLineHeight,
        fontSize: relativeFontSize,
        letterSpacing,
        fontFamily: fontFamily === '' ? undefined : fontFamily,
        fontWeight: fontFamily === '' ? '900' : undefined,
        ...style,
      }}
      {...props}
    />
  );
}
