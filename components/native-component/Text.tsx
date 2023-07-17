import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import tw from 'twrnc';
import { scaleFont } from '../../util';

interface Props extends TextProps {
  style?: TextStyle;
  fontSize?: number;
}

export function Text({ style, fontSize, ...props }: Props) {
  return (
    <RNText
      style={tw.style(
        `text-slate-700 text-[${scaleFont(fontSize || 14)}px]`,
        FontGmarketSansRegular,
        style
      )}
      {...props}
    />
  );
}
