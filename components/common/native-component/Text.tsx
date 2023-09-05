import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { FontGmarketSansRegular, fonts } from '../../../constant/fonts';
import { useFonts } from 'expo-font';
import tw from 'twrnc';

interface Props extends TextProps {
  style?: TextStyle;
}

export function Text({ style, ...props }: Props) {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <RNText
      allowFontScaling={false}
      style={tw.style(
        `text-slate-800 text-base py-0.5`,
        FontGmarketSansRegular,
        style
      )}
      {...props}
    />
  );
}
