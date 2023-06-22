import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import { scaleFont } from '../../util';
import tw from 'twrnc';

interface Props extends TextProps {
  fontSize?: number;
  style?: TextStyle;
}

export function Text({ fontSize, style, ...props }: Props) {
  return (
    <RNText
      style={tw.style(
        `text-slate-800 text-[${scaleFont(fontSize || 14)}px]`,
        FontGmarketSansRegular,
        style
      )}
      {...props}
    />
  );
}
