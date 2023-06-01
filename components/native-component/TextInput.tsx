import { TextInput as Input, Platform, TextInputProps } from 'react-native';
import { FontGmarketSansRegular } from '../../constant/fonts';
import { TouchableOpacity } from './TouchableOpacity';
import { LIGHT_GRAY } from '../../constant/colors';
import tw from 'twrnc';

interface Props extends TextInputProps {
  styletw?: string;
  onPress?: () => void;
}

export function TextInput({ styletw, onPress, ...props }: Props) {
  const onTouchPress = () => {
    if (typeof onPress === 'undefined') return null;
    onPress();
  };

  return (
    <>
      {Platform.OS === 'android' ? (
        <TouchableOpacity onPress={onTouchPress}>
          <Input
            style={tw.style(
              `border border-slate-400 h-11 p-2 rounded-lg bg-white ${
                styletw || ''
              }`,
              FontGmarketSansRegular
            )}
            {...props}
            placeholderTextColor={LIGHT_GRAY}
          />
        </TouchableOpacity>
      ) : (
        <Input
          style={tw.style(
            `border border-slate-400 p-2 h-11 rounded-lg bg-white ${
              styletw || ''
            }`,
            FontGmarketSansRegular
          )}
          placeholderTextColor={LIGHT_GRAY}
          {...props}
        />
      )}
    </>
  );
}
