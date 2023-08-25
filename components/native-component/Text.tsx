import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { FontGmarketSansRegular, fonts } from '../../constant/fonts';
import { responsiveFontSize } from '../../util';
import tw from 'twrnc';
import { useFonts } from 'expo-font';

interface Props extends TextProps {
  style?: TextStyle;
  fontSize?: number;
}

export function Text({ style, fontSize, ...props }: Props) {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <RNText
      allowFontScaling={false}
      style={tw.style(
        `text-slate-700 text-[${responsiveFontSize(fontSize || 14)}px] py-0.5`,
        FontGmarketSansRegular,
        style
      )}
      {...props}
    />
  );
}
