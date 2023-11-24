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

export const baseFont = 17;

export function Text({ style, fontSize = baseFont, ...props }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);

  const { height } = useWindowDimensions();

  const relativeFontSizeByFont =
    fontFamily === 'NanumSquareRoundEB' ? fontSize - 3 : fontSize;

  const relativeFontSize =
    height > 900 ? relativeFontSizeByFont + 2 : relativeFontSizeByFont;

  const lineHeight = 24 + 2 * (fontSize - baseFont);

  const relativeLineHeight = height > 900 ? lineHeight + 2 * 2 : lineHeight;

  return (
    <RNText
      allowFontScaling={false}
      style={{
        ...basicTextStyle,
        fontSize: relativeFontSize,
        fontFamily: fontFamily,
        lineHeight: relativeLineHeight,
        letterSpacing: fontFamily === 'HsSaemaul' ? 0.5 : 0,
        ...style,
      }}
      {...props}
    />
  );
}
