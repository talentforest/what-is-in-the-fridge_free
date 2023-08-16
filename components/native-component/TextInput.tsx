import {
  TextInput as Input,
  Platform,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import { TouchableOpacity } from './TouchableOpacity';
import { LIGHT_GRAY } from '../../constant/colors';
import { responsiveFontSize, scaleH } from '../../util';
import tw from 'twrnc';

interface Props extends TextInputProps {
  style?: TextStyle;
  onPress?: () => void;
}

export function TextInput({ style, onPress, ...props }: Props) {
  const onTouchPress = () => {
    if (typeof onPress === 'undefined') return null;
    onPress();
  };

  return (
    <>
      {Platform.OS === 'android' ? (
        <TouchableOpacity
          style={tw`flex-1 h-[${scaleH(44)}px]`}
          onPress={onTouchPress}
        >
          <Input
            style={tw.style(
              `h-full border border-slate-400 px-2 
              text-[${responsiveFontSize(14)}px]`,
              FontGmarketSansRegular,
              style
            )}
            {...props}
            placeholderTextColor={LIGHT_GRAY}
          />
        </TouchableOpacity>
      ) : (
        <Input
          style={tw.style(
            `h-[${scaleH(40)}px] 
            border border-slate-400 p-2 rounded-lg bg-white 
            text-[${responsiveFontSize(14)}px]`,
            FontGmarketSansRegular,
            style
          )}
          placeholderTextColor={LIGHT_GRAY}
          {...props}
        />
      )}
    </>
  );
}
