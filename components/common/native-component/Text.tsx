import {
  Text as RNText,
  TextProps,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import { useSelector } from '../../../redux/hook';
import { Fonts } from '../../../constant/fonts';

interface Props extends TextProps {
  style?: TextStyle;
  fontSize?: number;
}

export const basicTextStyle = {
  color: '#333',
};

export const baseFontSize = 16;

export const getRelativeFontSize = (font: Fonts, fontSize: number) => {
  return font === 'KotraHope'
    ? fontSize
    : font === 'LocusSangsang'
    ? fontSize - 2
    : fontSize - 3;
};

export function Text({ style, fontSize = baseFontSize, ...props }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);

  const { height } = useWindowDimensions();

  const relativeFontSize =
    height > 900
      ? getRelativeFontSize(fontFamily, fontSize) + 2
      : getRelativeFontSize(fontFamily, fontSize);

  const lineHeight = 24 + 2 * (relativeFontSize - baseFontSize);

  const relativeLineHeight = height > 900 ? lineHeight + 2 * 2 : lineHeight;

  return (
    <RNText
      allowFontScaling={false}
      style={{
        ...basicTextStyle,
        fontFamily,
        fontSize: relativeFontSize,
        lineHeight: relativeLineHeight,
        ...style,
      }}
      {...props}
    />
  );
}
