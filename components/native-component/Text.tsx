import { Text as RNText, TextProps } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import tw from 'twrnc';

interface Props extends TextProps {
  styletw?: string;
}

export function Text({ styletw, ...props }: Props) {
  return (
    <RNText
      style={tw.style(
        `text-slate-800 ${styletw || ''}`,
        FontGmarketSansRegular
      )}
      {...props}
    />
  );
}
