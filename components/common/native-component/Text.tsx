import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { HSSaemaulRegular, fonts } from '../../../constant/fonts';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
import { PlatformIOS } from '../../../constant/statusBarHeight';

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
        `text-slate-800 text-lg ${PlatformIOS ? 'pb-1' : ''}`,
        HSSaemaulRegular,
        style
      )}
      {...props}
    />
  );
}
